using System;
using System.Collections.Generic;
using System.Text;

namespace CarRepair.Data.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string LicencePlate { get; set; }
        public Client Owner { get; set; }
    }
}
