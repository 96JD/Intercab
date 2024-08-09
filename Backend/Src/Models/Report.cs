using System.ComponentModel.DataAnnotations;

namespace Intercab.Models;

public partial class Report
{
	public int Id { get; set; }

	[MinLength(10)]
	public required string Name { get; set; }

	public required string Path { get; set; }

	public sbyte IsGenerated { get; set; }

	public DateTime CreatedDate { get; set; }

	public int CompanyId { get; set; }

	public virtual Company? Company { get; set; }

	public virtual ICollection<Trip> Trips { get; set; } = [];
}