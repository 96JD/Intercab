using System.ComponentModel.DataAnnotations;

namespace Intercab.Models;

public partial class Trip
{
	public int Id { get; set; }

	[MinLength(5), MaxLength(15)]
	public required string LicenseNumber { get; set; }

	[MaxLength(10)]
	public string? CarNumber { get; set; }

	public decimal Price { get; set; }

	public DateTime StartDate { get; set; }

	public int ReportId { get; set; }

	public virtual Report? Report { get; set; }
}
