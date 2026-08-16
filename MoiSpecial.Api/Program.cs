using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure EF Core DbContext with fallback to InMemory for seamless development
builder.Services.AddDbContext<MoiSpecialDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (!string.IsNullOrEmpty(connectionString))
    {
        options.UseNpgsql(connectionString);
    }
    else
    {
        options.UseInMemoryDatabase("MoiSpecialDb");
    }
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://localhost:3000", "http://localhost:4000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Seed initial database content
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MoiSpecialDbContext>();
    db.Database.EnsureCreated();
    db.SeedInitialData();
}

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
