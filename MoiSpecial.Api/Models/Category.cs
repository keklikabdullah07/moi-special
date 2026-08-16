namespace MoiSpecial.Api.Models;

public class Category
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
