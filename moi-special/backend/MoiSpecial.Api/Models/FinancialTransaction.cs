using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoiSpecial.Api.Models
{
    [Table("financial_transactions")]
    public class FinancialTransaction
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = "Expense"; // Income / Expense

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = "ham_madde"; // ham_madde, fatura, kira, maas

        [Required]
        [MaxLength(250)]
        public string Title { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(50)]
        public string PaymentMethod { get; set; } = "Nakit"; // Nakit, KrediKartı, Online

        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
