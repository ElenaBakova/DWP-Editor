using Microsoft.AspNetCore.Http;
using Server;
using Server.Models;
using System.Text.Json;

var builder = WebApplication.CreateBuilder();

const string origins = "myOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: origins,
        corsPolicyBuilder =>
        {
            corsPolicyBuilder.WithOrigins("http://localhost:5098", "http://localhost:80", "http://localhost:3000");
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My Web Service API V1");
    options.RoutePrefix = string.Empty;
});

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/", async (HttpRequest request) =>
    {
        var files = request.Form.Files.OfType<IFormFile?>().ToList();

        if (files == null || files.Count <= 0)
        {
            return Results.BadRequest();
        }

        List<List<Error>> result = new();
        foreach (var file in files)
        {
            var errors = await GetErrorsAsync(file);
            result.Add(errors);
        }

        return Results.Ok(result);
    })
    .Accepts<IFormFile>("multipart/form-data")
    .Produces<List<List<Error>>>();

app.MapPost("/edit", (HttpRequest request) =>
{
    var file = request.Form.Files.OfType<IFormFile?>().FirstOrDefault();

    /*if (file == null || file.Length <= 0)
    {

        return Results.Json(null);
    }*/

    if (file == null)
    {
        return Results.BadRequest();
    }

    var content = GetContentAsync(file);
    if (content == null)
    {
        return Results.BadRequest();
    }
    var response = JsonSerializer.Serialize(content.Result);

    //return Results.Ok(response);
    return Results.Json(content.Result);
})
    .Accepts<IFormFile>("multipart/form-data");

app.UseCors(origins);
app.Run();

/// <summary>
/// Processes given file
/// </summary>
/// <param name="file">File to process</param>
/// <returns>List of errors in the file</returns>
static async Task<List<Error>> GetErrorsAsync(IFormFile? file)
{
    if (file == null || file.Length <= 0)
    {
        return new List<Error> { new("Файл пуст", "") };
    }

    SaveFileAsync(file);

    await ProcessFile.RunScriptAsync();
    var errors = await ProcessFile.ValidateDocumentAsync();

    return errors;
}

/// <summary>
/// Takes content from given file
/// </summary>
/// <param name="file">File to process</param>
/// <returns>Sections title and text of the file</returns>
static async Task<Content?> GetContentAsync(IFormFile? file)
{
    if (file == null || file.Length <= 0)
    {
        return await ProcessFile.GetSampleAsContent();
    }

    SaveFileAsync(file);
    await ProcessFile.RunScriptAsync();

    return await DeserializeFileAsync<Content>("results_structure/content.json");
}

static async Task<T?> DeserializeFileAsync<T>(string filePath)
{
    using var openStream = File.OpenRead(filePath);
    return await JsonSerializer.DeserializeAsync<T>(openStream);
}

/// <summary>
/// Processes given file
/// </summary>
/// <param name="file">File to process</param>
/// <returns>List of errors in the file</returns>
static async void SaveFileAsync(IFormFile file)
{
    var dirPath = Path.Combine(Environment.CurrentDirectory, "Files");
    if (Directory.Exists(dirPath))
    {
        Directory.Delete(dirPath, true);
    }

    Directory.CreateDirectory(dirPath);

    var filePath = Path.Combine(dirPath, file.Name);
    using (var stream = File.Create(filePath))
    {
        await file.CopyToAsync(stream);
    }
}
