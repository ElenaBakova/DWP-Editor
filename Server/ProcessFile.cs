namespace Server;

using System.Diagnostics;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Server.Models;

/// <summary>
/// Class for parsing file
/// </summary>
public class ProcessFile
{
    private static readonly string scriptPath = Environment.CurrentDirectory + "\\..\\Python-script\\";

    /// <summary>
    /// Runs python main.py script
    /// </summary>
    public static async Task RunScriptAsync()
    {
        ProcessStartInfo startInfo = new("python");

        var directory = scriptPath;
        const string script = "main.py";

        startInfo.WorkingDirectory = directory;
        startInfo.Arguments = script;
        startInfo.UseShellExecute = false;
        startInfo.CreateNoWindow = true;
        startInfo.RedirectStandardError = true;
        startInfo.RedirectStandardOutput = true;

        using Process process = new() {StartInfo = startInfo};
        _ = process.Start();
        await process.WaitForExitAsync();
    }

    /// <summary>
    /// Validates structure and content of loaded .DOCX file
    /// </summary>
    /// <returns>List of errors</returns>
    public static async Task<List<Error>> ValidateDocumentAsync()
    {
        var errorsList = await GetStructureErrorsAsync();
        errorsList.AddRange(await GetContentErrorsAsync());

        return errorsList;
    }

    private static async Task<List<Error>> GetContentErrorsAsync()
    {
        List<Error> errorsList = new();
        var content = await DeserializeFileAsync<Content>("..\\results_structure\\content.json");
        if (content == null)
        {
            return errorsList;
        }

        errorsList = await CheckContentAsync(content);

        return errorsList;
    }

    private static async Task<List<Error>> GetStructureErrorsAsync()
    {
        List<Error> errorsList = new();
        var structure = await DeserializeFileAsync<Structure>("..\\results_structure\\structure.json");
        if (structure == null)
        {
            return errorsList;
        }

        var properties = structure.GetType().GetProperties();
        foreach (var property in properties)
        {
            var value = property.GetValue(structure, null);
            if (value == null)
            {
                var name = GetName(property.Name);
                errorsList.Add(new Error($"Отсутствует раздел {name}", property.Name));
            }
        }

        return errorsList;
    }

    private static string GetName(string propertyName)
    {
        string name;
        if (propertyName.Contains("Section"))
        {
            name = propertyName[7..];
        }
        else if (propertyName[0] == '_')
        {
            name = propertyName[1] + "." + propertyName[2];
            if (propertyName.Length > 3)
            {
                name += "." + propertyName[3];
            }
        }
        else
        {
            name = "Титульная страница";
        }

        return name;
    }

    private static string GetTitle(string title)
    {
        title = title.Replace("\\", "");
        title = Regex.Replace(title, "\\( штатных\\)\\?", " штатных");

        return title;
    }

    private static async Task<T?> DeserializeFileAsync<T>(string filePath)
    {
        using var openStream = File.OpenRead(filePath);
        return await JsonSerializer.DeserializeAsync<T>(openStream);
    }

    private static List<Error> CheckTitlePage(string text, string pattern, string propertyName)
    {
        var splittedText = text.Split('\n');
        var splittedPattern = pattern.Split('\n');

        List<Error> errorsList = new();

        if (splittedText.Length != splittedPattern.Length)
        {
            if (splittedText.Length > 0 && splittedText[0] == "Санкт-Петербургский государственный университет")
            {
                errorsList.Add(new Error("На титульной странице необходимо добавить строку \"Правительство Российской Федерации\"", propertyName));
            }

            errorsList.Add(new Error("Некорректно оформлена титульная страница", propertyName));
            return errorsList;
        }

        for (int i = 0; i < splittedText.Length; i++)
        {
            var areEqual = Regex.IsMatch(splittedText[i], splittedPattern[i], RegexOptions.Compiled);
            if (!areEqual)
            {
                errorsList.Add(SwitchErrors(i, propertyName, splittedPattern[i]));
            }
        }

        return errorsList;
    }

    private static Error SwitchErrors(int index, string propertyName, string pattern)
    {
        if (index < 3 || index == 6 || index == 10)
        {
            return new Error($"На титульной странице в строке {index + 1} ожидается: {pattern}", propertyName);
        }

        string message = "";
        switch (index)
        {
            case 0:
            case 1:
            case 2:
            case 6:
            case 10:
                message = $": {pattern}";
                break;
            case 3:
                message = ": УЧЕБНОЙ ДИСЦИПЛИНЫ (ПРАКТИКИ)";
                break;
            case 4:
                message = " наименование на русском языке";
                break;
            case 5:
                message = " наименование на английском языке";
                break;
            case 7:
                message = " список языков обучения через запятую";
                break;
            case 8:
                message = ": Трудоемкость (границы трудоёмкости) в зачетных единицах: ";
                break;
            case 9:
                message = ": Регистрационный номер рабочей программы: ";
                break;
            case 11:
                message = " год";
                break;
            default:
                break;
        }

        return new Error($"На титульной странице в строке {index + 1} ожидается{message}", propertyName);
    }

    private static async Task<List<Error>> CheckContentAsync(Content content)
    {
        List<Error> errorsList = new();
        var sample = await DeserializeFileAsync<Content>("..\\Server\\Models\\sample.json");

        var properties = content.GetType().GetProperties();
        foreach (var property in properties)
        {
            var contentValue = property.GetValue(content, null);
            var sampleValue = property.GetValue(sample, null);
            if (contentValue == null)
            {
                continue;
            }

            if (property.Name == "TitlePage")
            {
                var text =
                    (string) (contentValue.GetType().GetProperty("text")?.GetValue(contentValue, null) ?? "");
                var pattern =
                    (string) (sampleValue?.GetType().GetProperty("text")?.GetValue(sampleValue, null) ?? "");
                if (text == "")
                {
                    errorsList.Add(new Error("Титульная страница не заполнена", property.Name));
                    continue;
                }

                errorsList.AddRange(CheckTitlePage(text, pattern, property.Name));
            }
            else
            {
                var title =
                    (string) (contentValue?.GetType().GetProperty("title")?.GetValue(contentValue, null) ?? "");
                var pattern =
                    (string) (sampleValue?.GetType().GetProperty("title")?.GetValue(sampleValue, null) ?? "");

                var areEqual = Regex.IsMatch(title, pattern, RegexOptions.Compiled);
                if (!areEqual)
                {
                    errorsList.Add(new Error($"Некорректное наименование раздела {GetName(property.Name)}. Ожидается: {GetTitle(pattern)}", property.Name));
                }
            }
        }

        return errorsList;
    }
}