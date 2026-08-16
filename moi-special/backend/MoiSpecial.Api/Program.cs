using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add Services to Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure EF Core with PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("PostgresConnection") 
    ?? "Host=postgres;Port=5432;Database=moispecial_db;Username=moi_admin;Password=MoiSpecialPass2026!";

builder.Services.AddDbContext<MoiDbContext>(options =>
    options.UseNpgsql(connectionString));

// Configure CORS for Angular Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Enable Swagger UI in All Environments for Testing
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Móí Special ERP API V1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowAngularFrontend");
app.UseAuthorization();
app.MapControllers();

// Ensure Database Created & Seeded on Startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MoiDbContext>();
    try
    {
        context.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"DB Initialization Note: {ex.Message}");
    }
}

app.Run();
