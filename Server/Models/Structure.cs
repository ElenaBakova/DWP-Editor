﻿namespace Server.Models;

using System.Text.Json.Serialization;

public class Structure
{
    [JsonPropertyName("Титульная страница")]
    public object[] TitlePage { get; set; }

    [JsonPropertyName("Раздел 1.")]
    public string[] Section1 { get; set; }

    [JsonPropertyName("1.1.")]
    public object[] _11 { get; set; }

    [JsonPropertyName("1.2.")]
    public object[] _12 { get; set; }

    [JsonPropertyName("1.3.")]
    public object[] _13 { get; set; }

    [JsonPropertyName("1.4.")]
    public object[] _14 { get; set; }

    [JsonPropertyName("Раздел 2.")]
    public string[] Section2 { get; set; }

    [JsonPropertyName("2.1.")]
    public string[] _21 { get; set; }

    [JsonPropertyName("2.1.1")]
    public object[] _211 { get; set; }

    [JsonPropertyName("2.2.")]
    public object[] _22 { get; set; }

    [JsonPropertyName("Раздел 3.")]
    public string[] Section3 { get; set; }

    [JsonPropertyName("3.1.")]
    public string[] _31 { get; set; }

    [JsonPropertyName("3.1.1")]
    public object[] _311 { get; set; }

    [JsonPropertyName("3.1.2")]
    public object[] _312 { get; set; }

    [JsonPropertyName("3.1.3")]
    public object[] _313 { get; set; }

    [JsonPropertyName("3.1.4")]
    public object[] _314 { get; set; }

    [JsonPropertyName("3.1.5")]
    public object[] _315 { get; set; }

    [JsonPropertyName("3.2.")]
    public string[] _32 { get; set; }

    [JsonPropertyName("3.2.1")]
    public object[] _321 { get; set; }

    [JsonPropertyName("3.2.2")]
    public object[] _322 { get; set; }

    [JsonPropertyName("3.3.")]
    public string[] _33 { get; set; }

    [JsonPropertyName("3.3.1")]
    public object[] _331 { get; set; }

    [JsonPropertyName("3.3.2")]
    public object[] _332 { get; set; }

    [JsonPropertyName("3.3.3")]
    public object[] _333 { get; set; }

    [JsonPropertyName("3.3.4")]
    public object[] _334 { get; set; }

    [JsonPropertyName("3.3.5")]
    public object[] _335 { get; set; }

    [JsonPropertyName("3.4.")]
    public string[] _34 { get; set; }

    [JsonPropertyName("3.4.1")]
    public object[] _341 { get; set; }

    [JsonPropertyName("3.4.2")]
    public object[] _342 { get; set; }

    [JsonPropertyName("3.4.3")]
    public object[] _343 { get; set; }

    [JsonPropertyName("Раздел 4.")]
    public string[] Section4 { get; set; }
}