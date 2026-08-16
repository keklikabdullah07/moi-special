namespace MoiSpecial.Api.Models;

public class Product
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CategoryId { get; set; } = string.Empty;
    public Category? Category { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsSpecialty { get; set; }
    public List<string> Tags { get; set; } = new();
    public bool IsAvailable { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
