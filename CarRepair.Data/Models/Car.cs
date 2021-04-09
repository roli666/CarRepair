using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

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

        [Required]
        public Client Owner { get; set; }
    }
}
