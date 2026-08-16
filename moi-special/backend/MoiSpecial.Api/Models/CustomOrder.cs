using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoiSpecial.Api.Models
{
    [Table("custom_orders")]
    public class CustomOrder
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(50)]
        public string OrderNo { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string CustomerName { get; set; } = string.Empty;

        [MaxLength(30)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string CakeType { get; set; } = string.Empty;

        public int PortionCount { get; set; }

        public DateTime EventDate { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "pending"; // pending, preparing, ready, delivered

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DepositPaid { get; set; }

        public string SpecialNotes { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
