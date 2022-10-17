using Parser;
// ../../../RPD.docx
Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("Please, enter .docx file path");

string path = "";
while (!File.Exists(path = Console.ReadLine()))
{
    Console.WriteLine("Invalid path please try again");
}
var parser = new WorkingProgramParser(path);