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

    /// <summary>
    /// Deserializes structure.json
    /// </summary>
    public static async void DeserializeStructureAsync()
    {
        string fileName = "..\\results_structure\\structure.json";
        using FileStream openStream = File.OpenRead(fileName);
        Structure? documentStructure = await JsonSerializer.DeserializeAsync<Structure>(openStream);
    }
}