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
using System;

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

            services.AddIdentityServer().AddApiAuthorization<CarRepairUser, CarRepairContext>()
                .AddInMemoryApiResources(Configuration.GetSection("IdentityServer:ApiResources"))
                .AddInMemoryClients(Configuration.GetSection("IdentityServer:Clients"));

            services.AddAuthentication().AddIdentityServerJwt().AddJwtBearer("Bearer", options =>
            {
                // URL of our identity server
                options.Authority = "https://localhost:55000";
                // HTTPS required for the authority (defaults to true but disabled for development).
                options.RequireHttpsMetadata = false;
                // the name of this API - note: matches the API resource name configured above
                options.Audience = "api";
            });

            services.AddCors(options =>
                {
                    options.AddPolicy("localhostPolicy", builder =>
                        builder.WithOrigins("http://localhost:3000", "https://localhost:3000", "http://localhost:3000/sign-in", "https://localhost:3000/sign-in")
                               .AllowCredentials()
                               .AllowAnyHeader()
                               .AllowAnyMethod()
                    );
                }
            );

            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("localhostPolicy");

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {   //TODO: add require auth
                endpoints.MapControllers();
                endpoints.MapHub<StatusHub>("/status", options =>
                {
                    options.Transports = HttpTransportType.WebSockets;
                });
            });
        }
    }
}
