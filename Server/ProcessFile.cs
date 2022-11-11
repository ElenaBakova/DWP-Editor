namespace Server;

using System.Diagnostics;
using System.Text.Json;
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

    public static async Task<List<string>> ValidateDocumentAsync()
    {
        List<string> errorsList = new();
        var structure = await DeserializeFileAsync<Structure>("..\\results_structure\\structure.json");
        if (structure == null)
        {
            errorsList.Add("Пустой файл");
            return errorsList;
        }

        var properties = structure.GetType().GetProperties();
        foreach (var property in properties)
        {
            var value = property.GetValue(structure, null);
        }

        return errorsList;
    }

    private static ValueTask<T?> DeserializeFileAsync<T>(string filePath)
    {
        //string fileName = "..\\results_structure\\structure.json";
        using FileStream openStream = File.OpenRead(filePath);
        return JsonSerializer.DeserializeAsync<T>(openStream);
    }
}