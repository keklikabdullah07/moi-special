using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly MoiSpecialDbContext _db;

    public CartController(MoiSpecialDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems([FromQuery] string sessionId = "default-session")
    {
        return await _db.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.SessionId == sessionId)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<CartItem>> AddToCart([FromBody] CartItem item)
    {
        var existing = await _db.CartItems
            .FirstOrDefaultAsync(ci => ci.ProductId == item.ProductId && ci.SessionId == item.SessionId);

        if (existing != null)
        {
            existing.Quantity += item.Quantity;
            existing.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            _db.CartItems.Add(item);
        }

        await _db.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveFromCart(string id)
    {
        var item = await _db.CartItems.FindAsync(id);
        if (item == null) return NotFound();

        _db.CartItems.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
