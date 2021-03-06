﻿using System.ComponentModel.DataAnnotations;

namespace CarRepair.Data.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(256)]
        public string Type { get; set; }

        [Required]
        [MaxLength(128)]
        public string LicencePlate { get; set; }

        public Client Owner { get; set; }

        [Required]
        public int OwnerId { get; set; }
    }
}