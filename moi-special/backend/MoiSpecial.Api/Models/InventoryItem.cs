using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoiSpecial.Api.Models
{
    [Table("inventory_items")]
    public class InventoryItem
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = "ham_madde"; // ham_madde, mamul_urun

        public double StockQuantity { get; set; }

        [Required]
        [MaxLength(20)]
        public string Unit { get; set; } = "kg"; // kg, lt, adet, paket

        public double MinimumThreshold { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        [MaxLength(150)]
        public string Supplier { get; set; } = string.Empty;

        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
}
