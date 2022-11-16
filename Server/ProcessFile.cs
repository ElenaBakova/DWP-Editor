namespace Server;

using System.Diagnostics;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

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

        string directory = scriptPath;
        string script = "main.py";

        startInfo.WorkingDirectory = directory;
        startInfo.Arguments = script;
        startInfo.UseShellExecute = false;
        startInfo.CreateNoWindow = true;
        startInfo.RedirectStandardError = true;
        startInfo.RedirectStandardOutput = true;

        using Process process = new() { StartInfo = startInfo };
        _ = process.Start();
        await process.WaitForExitAsync();
    }

    /// <summary>
    /// Validates structure and content of loaded .DOCX file
    /// </summary>
    /// <returns>List of errors</returns>
    public static async Task<List<(string message, string sectionName)>> ValidateDocumentAsync()
    {
        List<(string message, string sectionName)> errorsList = await GetStructureErrorsAsync();
        errorsList.AddRange(await GetContentErrorsAsync());

        return errorsList;
    }

    private static async Task<List<(string message, string sectionName)>> GetContentErrorsAsync()
    {
        List<(string message, string sectionName)> errorsList = new();
        var content = await DeserializeFileAsync<Content>("..\\results_structure\\content.json");
        if (content == null)
        {
            errorsList.Add(("Пустой файл", ""));
            return errorsList;
        }
        errorsList = await CheckContentAsync(content);

        return errorsList;
    }

    private static async Task<List<(string message, string sectionName)>> GetStructureErrorsAsync()
    {
        List<(string message, string sectionName)> errorsList = new();
        var structure = await DeserializeFileAsync<Structure>("..\\results_structure\\structure.json");
        if (structure == null)
        {
            errorsList.Add(("Пустой файл", ""));
            return errorsList;
        }

        var properties = structure.GetType().GetProperties();
        foreach (var property in properties)
        {
            var value = property.GetValue(structure, null);
            if (value == null)
            {
                var name = GetName(property.Name);
                errorsList.Add(($"Отсутствует раздел {name}", property.Name));
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
        using FileStream openStream = File.OpenRead(filePath);
        return await JsonSerializer.DeserializeAsync<T>(openStream);
    }

    private static async Task<List<(string message, string sectionName)>> CheckContentAsync(Content content)
    {
        List<(string message, string sectionName)> errorsList = new();
        var sample = await DeserializeFileAsync<Content>("..\\Server\\sample.json");

        var properties = content.GetType().GetProperties();
        foreach (var property in properties)
        {
            var contentValue = property.GetValue(content, null);
            if (property.Name == "TitlePage")
            {
                // check title page method
            }
            else
            {
                var sampleValue = property.GetValue(sample, null);
                string title = (string)(contentValue?.GetType().GetProperty("title")?.GetValue(contentValue, null) ?? "");
                string pattern = (string)(sampleValue?.GetType().GetProperty("title")?.GetValue(sampleValue, null) ?? "");
                bool areEqual = Regex.IsMatch(title, pattern, RegexOptions.Compiled);
                if (!areEqual)
                {
                    errorsList.Add(($"Некорректное наименование раздела {GetName(property.Name)}. Ожидается: {GetTitle(pattern)}", property.Name));
                }
            }
        }

        return errorsList;
    }
}