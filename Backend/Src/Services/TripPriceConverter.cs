using System.Text.RegularExpressions;

namespace Intercab.Services;

public static partial class TripPriceConverter
{
	[GeneratedRegex("\\s+")]
	private static partial Regex IncludesWhiteSpaces();

	public static decimal FormatPrice(string price)
	{
		string trimmedPrice = IncludesWhiteSpaces().Replace(price, "");
		trimmedPrice = trimmedPrice.Replace(",", ".");

		int dotIndex = trimmedPrice.IndexOf('.');
		if (dotIndex == 1)
		{
			trimmedPrice = trimmedPrice.Replace(".", "");
		}
		return decimal.Parse(trimmedPrice);
	}
}
