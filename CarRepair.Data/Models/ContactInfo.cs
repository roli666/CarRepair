using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarRepair.Data.Models
{
    public class ContactInfo
    {
        [Key]
        [MaxLength(256)]
        [EmailAddress]
        public string Email { get; set; }

        [JsonIgnore]
        public int ClientId { get; set; }

        [JsonIgnore]
        public Client Client { get; set; }

        [MinLength(1)]
        public IEnumerable<PhoneContact> PhoneContact { get; set; }
    }
}