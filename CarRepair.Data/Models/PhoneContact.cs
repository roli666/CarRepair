using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarRepair.Data.Models
{
    public class PhoneContact
    {
        [Key]
        [MaxLength(32)]
        public string PhoneNumber { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}
