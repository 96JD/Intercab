using Intercab.Infrastructure;
using Intercab.Models;
using Microsoft.AspNetCore.Mvc;
using _96JD.ErrorHandlerUtils;

namespace Intercab.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class CompanyController(IGenericRepository<Company> companyRepository) : ControllerBase
{
	[HttpGet("fetch-all-companies")]
	[ProducesResponseType<IEnumerable<Company>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllCompanies()
	{
		try
		{
			IEnumerable<Company> allCompanies = companyRepository.FetchAll();
			return Ok(new { allCompanies });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
