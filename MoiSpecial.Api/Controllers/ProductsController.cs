using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly MoiSpecialDbContext _db;

    public ProductsController(MoiSpecialDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] string? categoryId)
    {
        var query = _db.Products.AsQueryable();

        if (!string.IsNullOrEmpty(categoryId) && categoryId != "all")
        {
            query = query.Where(p => p.CategoryId == categoryId);
        }

        return await query.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(string id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }
}
