namespace Server;

public class Error
{
    public string Message { get; init; }

    public string Section { get; init; }

    public Error(string message, string section)
    {
        Message = message;
        Section = section;
    }
}