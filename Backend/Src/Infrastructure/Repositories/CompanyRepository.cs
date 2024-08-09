using Intercab.Models;

namespace Intercab.Infrastructure.Repositories;

public class CompanyRepository(IntercabContext db) : GenericRepository<Company>(db) { }
