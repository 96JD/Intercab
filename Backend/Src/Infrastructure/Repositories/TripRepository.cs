using Intercab.Models;
using Microsoft.EntityFrameworkCore;

namespace Intercab.Infrastructure.Repositories;

public class TripRepository(IntercabContext db) : GenericRepository<Trip>(db)
{
	public override IEnumerable<Trip> FetchAll()
	{
		return context.Trips?.Include(t => t.Report)!;
	}
}
