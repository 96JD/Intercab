using Intercab.Constants;
using Intercab.Models;
using OfficeOpenXml;
using System.Drawing;

namespace Intercab.Services;

public static class ExcelFileProcessor
{
    public static string UploadReport(IFormFile report)
    {
        string reportsFolder = $"reports/uploaded/";
        string reportsPath = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{reportsFolder}");
        Directory.CreateDirectory(reportsPath);
        string timestamp = DateTime.Now.ToString(DateConstants.DateTimeFormat);
        string guid = Guid.NewGuid().ToString();
        string reportName = report.FileName;
        string reportNameWithoutExtension = Path.GetFileNameWithoutExtension(reportName)!;
        string reportExtension = Path.GetExtension(reportName)!;
        string uniqueGeneratedReportName = $"{reportNameWithoutExtension} - {timestamp} - {guid}{reportExtension}";
        string generatedReportPath = Path.Combine(reportsPath, uniqueGeneratedReportName);
        report.CopyToAsync(new FileStream(generatedReportPath, FileMode.Create));
        return $"{reportsFolder}{uniqueGeneratedReportName}";
    }

    public static List<Trip> ExtractTripsFromReport(Report report)
    {
        FileInfo filePath = new(Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{report.Path}"));
        ExcelPackage package = new(filePath);
        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];

        int startRow = 2;
        int endRow = worksheet.Dimension.End.Row;
        int startDateColumn = 1;
        int priceColumn = 2;
        int licenseNumberIdColumn = 7;
        int carNumberIdColumn = 10;

        List<Trip> trips = [];

        for (int row = startRow; row <= endRow; row++)
        {
            DateTime timestampValue = worksheet.Cells[row, startDateColumn].GetValue<DateTime>();
            string priceValue = worksheet.Cells[row, priceColumn].GetValue<string>();
            decimal price = TripPriceConverter.FormatPrice(priceValue);
            string licenseNumberValue = worksheet.Cells[row, licenseNumberIdColumn].GetValue<string>();
            string carNumberValue = worksheet.Cells[row, carNumberIdColumn].GetValue<string>();

            Trip trip =
                new()
                {
                    LicenseNumber = licenseNumberValue,
                    CarNumber = carNumberValue,
                    Price = price,
                    StartDate = timestampValue,
                    ReportId = report.Id
                };

            trips.Add(trip);
        }
        return trips;
    }

    public static Report GenerateNewReport(int selectedCompanyId, List<Trip> trips)
    {
        ExcelPackage package = new();
        ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Trips");

        worksheet.Cells[1, 1].Value = "Start Date";
        worksheet.Cells[1, 2].Value = "Price";
        worksheet.Cells[1, 3].Value = "License Number";
        worksheet.Cells[1, 4].Value = "Car Number";

        ExcelRange columnTitles = worksheet.Cells[1, 1, 1, 4];
        columnTitles.Style.Font.Bold = true;

        trips = [.. trips.OrderBy(t => t.LicenseNumber).ThenBy(t => t.StartDate)];

        for (int i = 0; i < trips.Count; i++)
        {
            Trip trip = trips[i];
            worksheet.Cells[i + 2, 1].Value = trip.StartDate.ToString("yyyy-MM-dd HH:mm:ss");
            worksheet.Cells[i + 2, 2].Value = trip.Price;
            worksheet.Cells[i + 2, 3].Value = trip.LicenseNumber;
            worksheet.Cells[i + 2, 4].Value = trip.CarNumber;
        }

        int lastRow = worksheet.Dimension.End.Row;

        ExcelRange tripRowsDivider = worksheet.Cells[lastRow, 1, lastRow, worksheet.Dimension.End.Column];
        tripRowsDivider.Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
        tripRowsDivider.Style.Border.Bottom.Color.SetColor(Color.Black);

        IEnumerable<string> licenseNumbers = trips.Select(t => t.LicenseNumber).Distinct();
        foreach (string licenseNumber in licenseNumbers)
        {
            string sumFormula2 = $"SUMIF(C2:C{lastRow}, \"{licenseNumber}\", B2:B{lastRow})";
            worksheet.Cells[lastRow + 3, 1].Value = "Total";
            worksheet.Cells[lastRow + 3, 1].Style.Font.Bold = true;
            worksheet.Cells[lastRow + 3, 2].Value = licenseNumber;
            worksheet.Cells[lastRow + 3, 3].Formula = sumFormula2;
            lastRow++;
        }

        ExcelRange tripRowsSumDivider = worksheet.Cells[lastRow + 2, 1, lastRow + 2, worksheet.Dimension.End.Column];
        tripRowsSumDivider.Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
        tripRowsSumDivider.Style.Border.Bottom.Color.SetColor(Color.Black);

        string sumFormula1 = $"SUM(B2:B{lastRow})";
        worksheet.Cells[lastRow + 3, 3].Formula = sumFormula1;
        worksheet.Cells[lastRow + 3, 3].Style.Font.Bold = true;

        worksheet.Cells.AutoFitColumns();

        string reportsFolder = "reports/generated/";
        string reportsPath = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{reportsFolder}");
        Directory.CreateDirectory(reportsPath);
        string timestamp = DateTime.Now.ToString(DateConstants.DateTimeFormat);
        string guid = Guid.NewGuid().ToString();
        string uniqueGeneratedReportName = $"{timestamp} - {guid}.xlsx";
        string generatedReportPath = Path.Combine(reportsPath, uniqueGeneratedReportName);
        package.SaveAs(new FileInfo(generatedReportPath));

        Report generatedReport =
            new()
            {
                Name = uniqueGeneratedReportName,
                Path = Path.Combine(reportsFolder, uniqueGeneratedReportName),
                IsGenerated = 1,
                CompanyId = selectedCompanyId
            };

        return generatedReport;
    }
}