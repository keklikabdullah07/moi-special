using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Data
{
    public class MoiDbContext : DbContext
    {
        public MoiDbContext(DbContextOptions<MoiDbContext> options) : base(options) { }

        public DbSet<FinancialTransaction> FinancialTransactions { get; set; } = null!;
        public DbSet<InventoryItem> InventoryItems { get; set; } = null!;
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<CustomerProfile> CustomerProfiles { get; set; } = null!;
        public DbSet<CustomOrder> CustomOrders { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Initial Enterprise Data
            modelBuilder.Entity<FinancialTransaction>().HasData(
                new FinancialTransaction { Id = "e1", Type = "Expense", Category = "ham_madde", Title = "Boz Antep Fıstığı 50kg Alımı", Amount = 18500m, PaymentMethod = "KrediKartı", Date = DateTime.UtcNow.AddDays(-2) },
                new FinancialTransaction { Id = "e2", Type = "Expense", Category = "ham_madde", Title = "Saf Fransız Tereyağı 25kg", Amount = 6200m, PaymentMethod = "Nakit", Date = DateTime.UtcNow.AddDays(-1) },
                new FinancialTransaction { Id = "e3", Type = "Expense", Category = "fatura", Title = "Fırın Elektrik & Doğalgaz Faturası", Amount = 4800m, PaymentMethod = "Online", Date = DateTime.UtcNow.AddDays(-5) }
            );

            modelBuilder.Entity<InventoryItem>().HasData(
                new InventoryItem { Id = "i1", Name = "Ekşi Mayalık Özel Taş Fırın Unu", Category = "ham_madde", StockQuantity = 45, Unit = "kg", MinimumThreshold = 50, UnitPrice = 38m, Supplier = "Urfa Un Tarım A.Ş." },
                new InventoryItem { Id = "i2", Name = "Saf Fransız Tereyağı (%82 Yağ)", Category = "ham_madde", StockQuantity = 12, Unit = "kg", MinimumThreshold = 15, UnitPrice = 280m, Supplier = "Lactalis Gurme" },
                new InventoryItem { Id = "i3", Name = "Zümrüt Boz Antep Fıstığı (İç)", Category = "ham_madde", StockQuantity = 28, Unit = "kg", MinimumThreshold = 20, UnitPrice = 850m, Supplier = "Gaziantep Fıstıkçılık" },
                new InventoryItem { Id = "i4", Name = "Belçika Kuvertür Çikolatası", Category = "ham_madde", StockQuantity = 18, Unit = "kg", MinimumThreshold = 10, UnitPrice = 420m, Supplier = "Callebaut Türkiye" }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = "emp1", FullName = "Ahmet Usta (Taş Fırın Baş Usta)", Role = "firin_usta", MonthlySalary = 42000m, Bonus = 3500m, AdvanceDeduction = 2000m, Phone = "0533 111 22 33", ShiftHours = "04:00 - 13:00 (Sabah Pişirim)" },
                new Employee { Id = "emp2", FullName = "Mehmet Şef (Pastane & Entremet Şefi)", Role = "pastane_sef", MonthlySalary = 38000m, Bonus = 2800m, AdvanceDeduction = 1500m, Phone = "0535 222 33 44", ShiftHours = "07:00 - 16:00 (Gündüz Üretim)" }
            );

            modelBuilder.Entity<CustomerProfile>().HasData(
                new CustomerProfile { Id = "c1", FullName = "Zeynep Yıldız", Phone = "0532 888 77 66", Email = "zeynep.yildiz@gmail.com", BirthDate = "08-24", Tier = "VIP", LoyaltyPoints = 850, TotalSpent = 14200m },
                new CustomerProfile { Id = "c2", FullName = "Mustafa Demir", Phone = "0542 777 66 55", Email = "mustafa.demir@gmail.com", BirthDate = "09-12", Tier = "Gold", LoyaltyPoints = 420, TotalSpent = 7800m }
            );

            modelBuilder.Entity<CustomOrder>().HasData(
                new CustomOrder { Id = "o1", OrderNo = "ORD-1042", CustomerName = "Selin & Caner Çifti", Phone = "0532 999 00 11", CakeType = "3 Katlı Safranlı & Antep Fıstıklı Nişan Pastası", PortionCount = 80, EventDate = DateTime.UtcNow.AddDays(4), Status = "preparing", TotalPrice = 4800m, DepositPaid = 2000m, SpecialNotes = "Üst katmanda canlı beyaz güller." }
            );
        }
    }
}
