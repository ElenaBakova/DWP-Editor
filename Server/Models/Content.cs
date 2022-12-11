namespace Server.Models;

using System.Text.Json.Serialization;

public class Content
{
    [JsonPropertyName("Титульная страница")]
    public TitlePage TitlePage { get; set; }

    [JsonPropertyName("Раздел 1.")]
    public Section1 _1 { get; set; }

    [JsonPropertyName("1.1.")]
    public _11 _11 { get; set; }

    [JsonPropertyName("1.2.")]
    public _12 _12 { get; set; }

    [JsonPropertyName("1.3.")]
    public _13 _13 { get; set; }

    [JsonPropertyName("1.4.")]
    public _14 _14 { get; set; }

    [JsonPropertyName("Раздел 2.")]
    public Section2 _2 { get; set; }

    [JsonPropertyName("2.1.")]
    public _21 _21 { get; set; }

    [JsonPropertyName("2.1.1")]
    public _211 _211 { get; set; }

    [JsonPropertyName("2.2.")]
    public _22 _22 { get; set; }

    [JsonPropertyName("Раздел 3.")]
    public Section3 _3 { get; set; }

    [JsonPropertyName("3.1.")]
    public _31 _31 { get; set; }

    [JsonPropertyName("3.1.1")]
    public _311 _311 { get; set; }

    [JsonPropertyName("3.1.2")]
    public _312 _312 { get; set; }

    [JsonPropertyName("3.1.3")]
    public _313 _313 { get; set; }

    [JsonPropertyName("3.1.4")]
    public _314 _314 { get; set; }

    [JsonPropertyName("3.1.5")]
    public _315 _315 { get; set; }

    [JsonPropertyName("3.2.")]
    public _32 _32 { get; set; }

    [JsonPropertyName("3.2.1")]
    public _321 _321 { get; set; }

    [JsonPropertyName("3.2.2")]
    public _322 _322 { get; set; }

    [JsonPropertyName("3.3.")]
    public _33 _33 { get; set; }

    [JsonPropertyName("3.3.1")]
    public _331 _331 { get; set; }

    [JsonPropertyName("3.3.2")]
    public _332 _332 { get; set; }

    [JsonPropertyName("3.3.3")]
    public _333 _333 { get; set; }

    [JsonPropertyName("3.3.4")]
    public _334 _334 { get; set; }

    [JsonPropertyName("3.3.5")]
    public _335 _335 { get; set; }

    [JsonPropertyName("3.4.")]
    public _34 _34 { get; set; }

    [JsonPropertyName("3.4.1")]
    public _341 _341 { get; set; }

    [JsonPropertyName("3.4.2")]
    public _342 _342 { get; set; }

    [JsonPropertyName("3.4.3")]
    public _343 _343 { get; set; }

    [JsonPropertyName("Раздел 4.")]
    public Section4 _4 { get; set; }
}

public class _11
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _12
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _13
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _14
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _21
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _211
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _22
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _31
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _311
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _312
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _313
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _314
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _315
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _32
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _321
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _322
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _33
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _331
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _332
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _333
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _334
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _335
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _34
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _341
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _342
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class _343
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class Section1
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class Section2
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class Section3
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class Section4
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}

public class TitlePage
{
    [JsonPropertyName("title")]
    public string title { get; set; }

    [JsonPropertyName("text")]
    public string text { get; set; }
}