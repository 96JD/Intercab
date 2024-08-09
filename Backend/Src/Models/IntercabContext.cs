using Microsoft.EntityFrameworkCore;

namespace Intercab.Models;

public partial class IntercabContext : DbContext
{
	public IntercabContext() { }

	public IntercabContext(DbContextOptions<IntercabContext> options)
		: base(options) { }

	public virtual DbSet<Company>? Companies { get; set; }

	public virtual DbSet<Report>? Reports { get; set; }

	public virtual DbSet<Trip>? Trips { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.UseCollation("utf8mb4_0900_ai_ci").HasCharSet("utf8mb4");

		modelBuilder.Entity<Company>(entity =>
		{
			entity.ToTable("companies");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Name).HasMaxLength(50).HasColumnName("name");
			entity.HasIndex(e => e.Name, "name").IsUnique();
			entity.Property(e => e.Address).HasMaxLength(100).HasColumnName("address");
			entity.HasIndex(e => e.Address, "address").IsUnique();
		});

		modelBuilder.Entity<Report>(entity =>
		{
			entity.ToTable("reports");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.CompanyId).HasColumnName("company_id");
			entity.HasIndex(e => e.CompanyId, "company_id");
			entity.Property(e => e.IsGenerated).HasColumnName("is_generated");
			entity.Property(e => e.Name).HasMaxLength(255).HasColumnName("name");
			entity.Property(e => e.Path).HasMaxLength(255).HasColumnName("path");
			entity
				.Property(e => e.CreatedDate)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_date");
			entity
				.HasOne(d => d.Company)
				.WithMany(p => p.Reports)
				.HasForeignKey(d => d.CompanyId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("reports_ibfk_1");
		});

		modelBuilder.Entity<Trip>(entity =>
		{
			entity.ToTable("trips");
			entity.HasKey(e => e.Id).HasName("PRIMARY");
			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.CarNumber).HasMaxLength(10).HasColumnName("car_number");
			entity.Property(e => e.LicenseNumber).HasMaxLength(15).HasColumnName("license_number");
			entity.Property(e => e.Price).HasPrecision(10, 2).HasColumnName("price");
			entity.Property(e => e.ReportId).HasColumnName("report_id");
			entity.HasIndex(e => e.ReportId, "report_id");
			entity
				.Property(e => e.StartDate)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("start_date");
			entity
				.HasOne(d => d.Report)
				.WithMany(p => p.Trips)
				.HasForeignKey(d => d.ReportId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("trips_ibfk_1");
		});
	}
}
