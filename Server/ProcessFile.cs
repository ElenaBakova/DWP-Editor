namespace Server;

using System.Diagnostics;

/// <summary>
/// Class for parsing file
/// </summary>
public class ProcessFile
{
    private static readonly string scriptPath = Environment.CurrentDirectory + "\\..\\Python-script\\";

    /// <summary>
    /// Runs python main.py script
    /// </summary>
    public static async void RunScriptAsync()
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
}