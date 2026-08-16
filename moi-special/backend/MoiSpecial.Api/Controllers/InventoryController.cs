using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly MoiDbContext _context;

        public InventoryController(MoiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetInventory()
        {
            var items = await _context.InventoryItems.OrderBy(i => i.Name).ToListAsync();
            return Ok(items);
        }

        [HttpGet("critical")]
        public async Task<IActionResult> GetCriticalStockAlerts()
        {
            var alerts = await _context.InventoryItems
                .Where(i => i.StockQuantity <= i.MinimumThreshold)
                .ToListAsync();
            return Ok(alerts);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] InventoryItem item)
        {
            item.LastUpdated = DateTime.UtcNow;
            _context.InventoryItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInventory), new { id = item.Id }, item);
        }

        [HttpPut("{id}/stock")]
        public async Task<IActionResult> UpdateStock(string id, [FromBody] double delta)
        {
            var item = await _context.InventoryItems.FindAsync(id);
            if (item == null) return NotFound();

            item.StockQuantity = Math.Max(0, item.StockQuantity + delta);
            item.LastUpdated = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(item);
        }
    }
}
