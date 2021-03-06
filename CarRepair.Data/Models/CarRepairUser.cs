﻿using Microsoft.AspNetCore.Identity;

namespace CarRepair.Data.Models
{
    public class CarRepairUser : IdentityUser
    {
        public bool IsAdmin { get; set; } = false;
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}