using CarRepair.API.Hubs;
using CarRepair.Data;
using CarRepair.Data.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;

namespace CarRepair.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CarRepairContext>(opts => opts.UseSqlServer(Configuration.GetConnectionString("DBConnection")));

            services.AddDefaultIdentity<CarRepairUser>().AddEntityFrameworkStores<CarRepairContext>();

            services.AddIdentityServer()
                    .AddApiAuthorization<CarRepairUser, CarRepairContext>()
                    .AddProfileService<IdentityProfileService>();

            services.AddAuthentication().AddIdentityServerJwt();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdmin", policy =>
                {
                    policy.RequireClaim(ClaimTypes.Role, "Admin");
                });
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            services.AddRazorPages();

            services.AddSignalR();

            services.AddCors(options =>
                {
                    options.AddPolicy("localhostPolicy", builder =>
                        builder.WithOrigins("http://localhost:3000", "https://localhost:3000")
                               .AllowAnyHeader()
                               .AllowAnyMethod()
                    );
                }
            );
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("localhostPolicy");

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
                endpoints.MapHub<StatusHub>("/status", options =>
                {
                    options.Transports = HttpTransportType.WebSockets;
                });
            });
        }
    }
}