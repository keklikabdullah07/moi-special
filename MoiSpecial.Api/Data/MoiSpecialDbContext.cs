using Microsoft.EntityFrameworkCore;
using MoiSpecial.Api.Models;

namespace MoiSpecial.Api.Data;

public class MoiSpecialDbContext : DbContext
{
    public MoiSpecialDbContext(DbContextOptions<MoiSpecialDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<CartItem> CartItems => Set<CartItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Name).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired().HasMaxLength(150);
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
            entity.HasOne(p => p.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(p => p.CategoryId);
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(ci => ci.Id);
            entity.HasOne(ci => ci.Product);
        });
    }

    public void SeedInitialData()
    {
        if (Categories.Any()) return;

        var categories = new List<Category>
        {
            new Category { Id = "fistikli", Name = "Fıstıklı Özel", Description = "Antep fıstığının en gurme hali", DisplayOrder = 1 },
            new Category { Id = "pastane", Name = "Artisan Pastane", Description = "Günlük taze Fransız & Mezopotamya entremetleri", DisplayOrder = 2 },
            new Category { Id = "firin", Name = "Taş Fırın & Ekmek", Description = "Odun ateşinde pişen ekşi mayalı özel ekmekler", DisplayOrder = 3 },
            new Category { Id = "icecek", Name = "Gurme İçecekler", Description = "Özel harman nitelikli kahveler", DisplayOrder = 4 }
        };

        Categories.AddRange(categories);

        var products = new List<Product>
        {
            new Product
            {
                Id = "fistikli-croissant",
                Name = "Antep Fıstıklı Artisan Kruvasan",
                CategoryId = "fistikli",
                Description = "Kat kat Fransız tereyağlı hamur, içi bol Antep fıstığı kreması ve üzeri zümrüt fıstık taneleri.",
                Price = 185.00m,
                ImageUrl = "assets/croissant.jpg",
                IsSpecialty = true,
                Tags = new List<string> { "Gurme Seçim", "Günlük Taze", "Fıstıklı" }
            },
            new Product
            {
                Id = "pistachio-entremet",
                Name = "Moi Special Fıstıklı Entremet",
                CategoryId = "pastane",
                Description = "Ayna parlaklığında zümrüt fıstık glazürü, taze ahududular ve 24K yenilebilir altın yaprakları.",
                Price = 480.00m,
                ImageUrl = "assets/entremet.jpg",
                IsSpecialty = true,
                Tags = new List<string> { "Lüks İmza", "Taze Ahududu", "Glazür" }
            },
            new Product
            {
                Id = "urfa-sourdough",
                Name = "Mezopotamya Taş Fırın Ekmeği",
                CategoryId = "firin",
                Description = "72 saat soğuk fermentasyon geçiren, geleneksel Urfa odun fırınında pişen çıtır kabuklu ekşi maya ekmeği.",
                Price = 95.00m,
                ImageUrl = "assets/hero-bakery.jpg",
                IsSpecialty = false,
                Tags = new List<string> { "Ekşi Maya", "Odun Ateşi" }
            },
            new Product
            {
                Id = "pistachio-latte",
                Name = "Antep Fıstığı Kremalı Specialty Latte",
                CategoryId = "icecek",
                Description = "Taze çekilmiş nitelikli espresso, kadifemsi süt ve ev yapımı Antep fıstığı püresi pralini.",
                Price = 165.00m,
                ImageUrl = "assets/croissant.jpg",
                IsSpecialty = true,
                Tags = new List<string> { "Nitelikli Kahve", "Özel Harman" }
            }
        };

        Products.AddRange(products);
        SaveChanges();
    }
}
