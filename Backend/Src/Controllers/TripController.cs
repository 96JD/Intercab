using Intercab.Infrastructure;
using Intercab.Models;
using Microsoft.AspNetCore.Mvc;
using _96JD.ErrorHandlerUtils;

namespace Intercab.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class TripController(IGenericRepository<Trip> tripRepository) : ControllerBase
{
	[HttpGet("fetch-all-trips")]
	[ProducesResponseType<IEnumerable<Trip>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllTrips()
	{
		try
		{
			IEnumerable<Trip> allTrips = tripRepository.FetchAll();
			return Ok(new { allTrips });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
