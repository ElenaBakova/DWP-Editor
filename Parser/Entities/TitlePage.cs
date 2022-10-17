namespace Parser.Entities;

/// <summary>
/// Contains information about title page
/// </summary>
public class TitlePage
{
    /// <summary>
    /// Programme name in Russian
    /// </summary>
    public string RussianName { get; private set; }

    /// <summary>
    /// Programme name in English
    /// </summary>
    public string EnglishName { get; private set; }

    // Языки обучения
    // Трудоёмкость в ЗЕ
    // Рег. номер рабочей программы

    /// <summary>
    /// Creates instance of the TitlePage class
    /// </summary>
    /// <param name="russianName">Programme name in Russian</param>
    /// <param name="englishName">Programme name in English</param>
    public TitlePage(string russianName, string englishName)
    {
        RussianName = russianName;
        EnglishName = englishName;
    }
}
