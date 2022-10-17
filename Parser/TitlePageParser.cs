using DocumentFormat.OpenXml.Wordprocessing;

namespace Parser;

internal class TitlePageParser
{
    public TitlePageParser(Body body)
    {

    }

    private static (string RussianName, string EnglishName) ParseName(Body body)
    {
        var englishName = "";
        var russianName = "";

        var firstTable = body.Elements<Table>().First();
        var paragraphs = firstTable.ElementsBefore().OfType<Paragraph>();
        var nameParagraph = paragraphs.Last();

        var runs = nameParagraph.Descendants<Run>();
        var seenBreak = false;
        foreach (var run in runs)
        {
            foreach (var element in run.ChildElements)
            {
                if (element.LocalName == "br")
                {
                    seenBreak = true;
                    continue;
                }
                if (seenBreak)
                {
                    englishName += element.InnerText;
                    continue;
                }
                russianName += element.InnerText;
            }
        }

        return (russianName, englishName);
    }
}
