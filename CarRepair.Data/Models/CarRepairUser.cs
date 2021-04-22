using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace CarRepair.Data.Models
{
    public class CarRepairUser : IdentityUser
    {
        public bool IsAdmin { get; set; } = false;
    }
}