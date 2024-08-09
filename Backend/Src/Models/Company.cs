using System.ComponentModel.DataAnnotations;

namespace Intercab.Models;

public partial class Company
{
	public int Id { get; set; }

	[MinLength(3), MaxLength(50)]
	public required string Name { get; set; }

	[MinLength(10), MaxLength(100)]
	public required string Address { get; set; }

	public virtual ICollection<Report> Reports { get; set; } = [];
}