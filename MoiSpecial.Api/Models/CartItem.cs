namespace MoiSpecial.Api.Models;

public class CartItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string ProductId { get; set; } = string.Empty;
    public Product? Product { get; set; }
    public int Quantity { get; set; } = 1;
    public string SessionId { get; set; } = "default-session";
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
