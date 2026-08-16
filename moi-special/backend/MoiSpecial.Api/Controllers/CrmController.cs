using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CrmController : ControllerBase
    {
        private readonly MoiDbContext _context;

        public CrmController(MoiDbContext context)
        {
            _context = context;
        }

        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomers()
        {
            var list = await _context.CustomerProfiles.ToListAsync();
            return Ok(list);
        }

        [HttpPost("customers/{id}/points")]
        public async Task<IActionResult> AddPoints(string id, [FromBody] int points)
        {
            var cust = await _context.CustomerProfiles.FindAsync(id);
            if (cust == null) return NotFound();

            cust.LoyaltyPoints += points;
            await _context.SaveChangesAsync();
            return Ok(cust);
        }
    }
}
