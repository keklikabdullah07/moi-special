using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Data;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FinanceController : ControllerBase
    {
        private readonly MoiDbContext _context;

        public FinanceController(MoiDbContext context)
        {
            _context = context;
        }

        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var list = await _context.FinancialTransactions.OrderByDescending(t => t.Date).ToListAsync();
            return Ok(list);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var expenses = await _context.FinancialTransactions
                .Where(t => t.Type == "Expense")
                .SumAsync(t => t.Amount);

            decimal cash = 14200m;
            decimal card = 28450m;
            decimal online = 5600m;
            decimal totalRevenue = cash + card + online;

            return Ok(new
            {
                CashRevenue = cash,
                CardRevenue = card,
                OnlineRevenue = online,
                TotalRevenue = totalRevenue,
                TotalExpenses = expenses,
                NetProfit = totalRevenue - expenses
            });
        }

        [HttpPost("expenses")]
        public async Task<IActionResult> AddExpense([FromBody] FinancialTransaction exp)
        {
            exp.Type = "Expense";
            exp.Date = DateTime.UtcNow;
            _context.FinancialTransactions.Add(exp);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTransactions), new { id = exp.Id }, exp);
        }
    }
}
