using CarRepair.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarRepair.Data.Configuration
{
    public class CarRepairUserConfiguration : IEntityTypeConfiguration<CarRepairUser>
    {
        public const string adminId = "5B909B9F-ED94-4973-B762-58EFD8C671DF";
        public void Configure(EntityTypeBuilder<CarRepairUser> builder)
        {
            var passwordHasher = new PasswordHasher<CarRepairUser>();
            var adminUser = new CarRepairUser
            {
                Id = adminId,
                Email = "admin@admin.com",
                EmailConfirmed = true,
                IsAdmin = true,
                UserName = "admin",
                SecurityStamp = Guid.NewGuid().ToString()
            };
            adminUser.PasswordHash = passwordHasher.HashPassword(adminUser, "Admin01!");
            builder.HasData(adminUser);
        }
    }
}
