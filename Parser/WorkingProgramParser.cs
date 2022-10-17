using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Packaging;

namespace Parser;

internal class WorkingProgramParser
{

    //public string WorkingProgram { get; set; }

    /// <summary>
    /// Creates instance of the WorkingProgramParser class
    /// </summary>
    /// <param name="filePath">Path to the .docx document</param>
    public WorkingProgramParser(string filePath)
    {
        using (var wordDocument = WordprocessingDocument.Open(filePath, false))
        {
            if (wordDocument == null)
            {
                throw new InvalidDataException("Can't open file");
            }
            
            if (wordDocument.MainDocumentPart == null)
            {
                throw new InvalidDataException("File is empty");
            }
            var document = wordDocument.MainDocumentPart.Document;
            var body = document.Body;
            var para = body.Elements<Paragraph>();
            Console.WriteLine($"------{body.Elements<Paragraph>().First()}");
        }
    }
}
