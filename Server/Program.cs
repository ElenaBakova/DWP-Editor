using Server;
using Server.Models;

var builder = WebApplication.CreateBuilder();

const string origins = "myOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: origins,
        corsPolicyBuilder =>
        {
            corsPolicyBuilder.WithOrigins("http://localhost:5098", "http://localhost:7098", "http://localhost:3000");
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
        var file = request.Form.Files.OfType<IFormFile?>().FirstOrDefault();
        if (file == null || file.Length <= 0)
        {
            return Results.BadRequest("File is empty");
        }

        var dirPath = Environment.CurrentDirectory + "\\..\\Files\\";
        if (Directory.Exists(dirPath))
        {
            Directory.Delete(dirPath, true);
        }

        Directory.CreateDirectory(dirPath);

        var filePath = dirPath + file.Name;
        using (var stream = File.Create(filePath))
        {
            await file.CopyToAsync(stream);
        }

        await ProcessFile.RunScriptAsync();
        var errors = await ProcessFile.ValidateDocumentAsync();

        return Results.Ok(errors);
    })
    .Accepts<IFormFile>("multipart/form-data")
    .Produces<List<Error>>();

app.UseCors(origins);
app.Run();