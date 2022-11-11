using Server;

WebApplicationBuilder builder = WebApplication.CreateBuilder();

string origins = "myOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: origins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:5098", "http://localhost:7098", "http://localhost:3000");
                      });
});

WebApplication app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/", async (HttpRequest request) =>
{
    IFormFile? file = request.Form.Files.OfType<IFormFile?>().FirstOrDefault();
    if (file == null || file.Length <= 0)
    {
        return Results.BadRequest("File is empty");
    }

    string dirPath = Environment.CurrentDirectory + "\\..\\Files\\";
    if (Directory.Exists(dirPath))
    {
        Directory.Delete(dirPath, true);
    }
    Directory.CreateDirectory(dirPath);

    string filePath = dirPath + file.Name;
    using (FileStream stream = File.Create(filePath))
    {
        await file.CopyToAsync(stream);
    }

    await ProcessFile.RunScriptAsync();
    var errors = await ProcessFile.ValidateDocumentAsync();

    return Results.Ok();
})
.Accepts<IFormFile>("multipart/form-data");

app.UseCors(origins);
app.Run();