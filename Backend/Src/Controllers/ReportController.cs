using Intercab.Infrastructure;
using Intercab.Models;
using Intercab.Services;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using _96JD.ErrorHandlerUtils;

namespace Intercab.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ReportController(IGenericRepository<Report> reportRepository, IGenericRepository<Trip> tripRepository)
	: ControllerBase
{
	[HttpGet("fetch-all-reports")]
	[ProducesResponseType<IEnumerable<Report>>(StatusCodes.Status200OK)]
	public IActionResult FetchAllReports()
	{
		try
		{
			IEnumerable<Report> allReports = reportRepository.FetchAll();
			return Ok(new { allReports });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}

	[HttpPost("upload-reports")]
	[ProducesResponseType<Report>(StatusCodes.Status200OK)]
	public IActionResult UploadReports(IFormCollection formData)
	{
		try
		{
			IFormFileCollection reports = formData.Files;
			if (reports.Count == 0)
			{
				return BadRequest(ErrorHandlerUtils.FilesNotUploaded("reports"));
			}

			List<Report> uploadedReports = [];
			int selectedCompanyId = int.Parse(formData["selectedCompanyId"]!);

			foreach (IFormFile file in reports)
			{
				string reportPath = ExcelFileProcessor.UploadReport(file);
				Report report =
					new()
					{
						Name = file.FileName,
						Path = reportPath,
						CompanyId = selectedCompanyId
					};

				uploadedReports.Add(report);

				reportRepository.Create(report);
				reportRepository.SaveChanges();
			}

			ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

			foreach (Report report in uploadedReports)
			{
				List<Trip> trips = ExcelFileProcessor.ExtractTripsFromReport(report);
				foreach (Trip trip in trips)
				{
					tripRepository.Create(trip);
					tripRepository.SaveChanges();
				}
				Report generatedReport = ExcelFileProcessor.GenerateNewReport(selectedCompanyId, trips);
				reportRepository.Create(generatedReport);
				reportRepository.SaveChanges();
			}

			return Ok(new { uploadedReports });
		}
		catch (Exception e)
		{
			return StatusCode(500, ErrorHandlerUtils.ExceptionError(e));
		}
	}
}
