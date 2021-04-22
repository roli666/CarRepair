using CarRepair.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace CarRepair.Data.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public const string adminRoleId = "51C5B017-884C-4A59-8838-92A891F389AB";
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(new IdentityRole {
                Id = adminRoleId,
                Name = "Admin",
                NormalizedName = "Admin"
            });
        }
    }
}
