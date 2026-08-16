using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoiSpecial.Api.Models
{
    [Table("customer_profiles")]
    public class CustomerProfile
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [MaxLength(30)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string BirthDate { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Tier { get; set; } = "Bronze"; // VIP, Gold, Silver, Bronze

        public int LoyaltyPoints { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalSpent { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
