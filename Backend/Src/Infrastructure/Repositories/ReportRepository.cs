using Intercab.Models;
using Microsoft.EntityFrameworkCore;

namespace Intercab.Infrastructure.Repositories;

public class ReportRepository(IntercabContext db) : GenericRepository<Report>(db)
{
	public override IEnumerable<Report> FetchAll()
	{
		return context.Reports?.Include(r => r.Company)!;
	}
}
