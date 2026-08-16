using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly MoiSpecialDbContext _db;

    public CategoriesController(MoiSpecialDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _db.Categories.OrderBy(c => c.DisplayOrder).ToListAsync();
    }
}
