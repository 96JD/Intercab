using Intercab.Infrastructure;
using Intercab.Infrastructure.Repositories;
using Intercab.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
string connectionString = configuration.GetConnectionString("DefaultConnection")!;
string[] origins = configuration.GetSection("FrontEnd:Origins").Get<string[]>()!;

builder
	.Services.AddControllers()
	.AddNewtonsoftJson(o => o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(o =>
	o.AddDefaultPolicy(p => p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod().AllowCredentials())
);

builder.Services.AddDbContext<IntercabContext>(o =>
	o.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)).EnableDetailedErrors()
);

builder.Services.AddScoped<IGenericRepository<Company>, CompanyRepository>();
builder.Services.AddScoped<IGenericRepository<Report>, ReportRepository>();
builder.Services.AddScoped<IGenericRepository<Trip>, TripRepository>();

builder.Services.AddSwaggerGen(o =>
	o.SwaggerDoc(
		"v1",
		new OpenApiInfo
		{
			Title = "Intercab AS API",
			Version = "v1",
			Description = "An API that aims at generating reports for Intercab AS company in Norway.",
			Contact = new OpenApiContact
			{
				Name = "Jacob Dolorzo",
				Email = "jacob.dolorzo.96@gmail.com",
				Url = new Uri(configuration["Swagger:Contact"]!),
			},
		}
	)
);

WebApplication app = builder.Build();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

await app.RunAsync();
