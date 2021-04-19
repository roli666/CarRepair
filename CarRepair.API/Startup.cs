using CarRepair.API.Hubs;
using CarRepair.Data;
using CarRepair.Data.Models;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using static IdentityModel.OidcConstants;

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
            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

            if (string.IsNullOrEmpty(connectionString))
                services.AddDbContext<CarRepairContext>(opts => opts.UseSqlServer(Configuration.GetConnectionString("MigrationConnection")));
            else
                services.AddDbContext<CarRepairContext>(opts => opts.UseSqlServer(connectionString));

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            services.AddDefaultIdentity<CarRepairUser>().AddEntityFrameworkStores<CarRepairContext>();

            services.AddIdentityServer().AddApiAuthorization<CarRepairUser, CarRepairContext>();

            services.AddAuthentication(IdentityServerConstants.DefaultCookieAuthenticationScheme).AddIdentityServerJwt().AddJwtBearer("Bearer", options =>
            {
                // URL of our identity server
                options.Authority = "https://localhost:55001";
                // HTTPS required for the authority (defaults to true but disabled for development).
                options.RequireHttpsMetadata = false;
                // the name of this API - note: matches the API resource name configured above
                options.Audience = "CarAPI";
            });

            services.AddCors(options =>
                {
                    options.AddPolicy("localhostPolicy", builder =>
                        builder.WithOrigins("http://localhost:3000", "https://localhost:3000")
                               .AllowCredentials()
                               .AllowAnyHeader()
                               .AllowAnyMethod()
                    );
                }
            );

            services.AddRazorPages();

            services.AddSignalR();
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

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseCors("localhostPolicy");

            app.UseEndpoints(endpoints =>
            {   //TODO: add require auth
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
