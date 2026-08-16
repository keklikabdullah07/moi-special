using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoiSpecial.Api.Models
{
    [Table("employees")]
    public class Employee
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Role { get; set; } = "firin_usta"; // firin_usta, pastane_sef, tezgah_personel, mudur

        [Column(TypeName = "decimal(18,2)")]
        public decimal MonthlySalary { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Bonus { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal AdvanceDeduction { get; set; }

        [MaxLength(30)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(200)]
        public string ShiftHours { get; set; } = string.Empty;

        public DateTime HireDate { get; set; } = DateTime.UtcNow;
    }
}
