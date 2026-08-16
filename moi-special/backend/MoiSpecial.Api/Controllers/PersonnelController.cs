using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonnelController : ControllerBase
    {
        private readonly MoiDbContext _context;

        public PersonnelController(MoiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var list = await _context.Employees.ToListAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee emp)
        {
            emp.HireDate = DateTime.UtcNow;
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return Ok(emp);
        }

        [HttpPost("{id}/advance")]
        public async Task<IActionResult> RecordAdvance(string id, [FromBody] decimal amount)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return NotFound();

            emp.AdvanceDeduction += amount;
            await _context.SaveChangesAsync();
            return Ok(emp);
        }

        [HttpPost("{id}/bonus")]
        public async Task<IActionResult> RecordBonus(string id, [FromBody] decimal amount)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return NotFound();

            emp.Bonus += amount;
            await _context.SaveChangesAsync();
            return Ok(emp);
        }
    }
}
