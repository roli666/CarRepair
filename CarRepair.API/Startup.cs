using CarRepair.Data;
using CarRepair.Data.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
            services.AddDbContext<CarRepairContext>(opts=> opts.UseSqlServer(Configuration.GetConnectionString("CarRepairDB")));

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            services.AddDefaultIdentity<CarRepairUser>().AddEntityFrameworkStores<CarRepairContext>();

            services.AddIdentityServer().AddApiAuthorization<CarRepairUser, CarRepairContext>();

            services.AddAuthentication().AddIdentityServerJwt();

            services.AddCors(options =>
                {
                    options.AddPolicy("localhostPolicy", builder => builder.WithOrigins("http://localhost:3000", "https://localhost:3000"));
                }
            );
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
            app.UseAuthorization();
            app.UseIdentityServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireAuthorization();
            });
        }
    }
}
