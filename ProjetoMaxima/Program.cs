using ProjetoMaxima.Controllers;
using ProjetoMaxima.Services;
using ProjetoMaxima.Services.Data;
using System.Configuration;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
builder.Services.AddSingleton<MySqlConnectionDB>();
builder.Services.AddScoped<ProdutosService>();
builder.Services.AddScoped<LoginController>();
builder.Services.AddScoped<DepartamentoService>();

builder.Services.Configure<ApiConfig>(configuration.GetSection("ApiConfig"));


var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

var cultureInfo = new CultureInfo("pt-BR");
cultureInfo.NumberFormat.NumberDecimalSeparator = ".";
cultureInfo.NumberFormat.CurrencyDecimalSeparator = ".";

CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Login}/{action=Index}/{id?}");

app.Run();
