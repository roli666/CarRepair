using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarRepair.Data.Models
{
    public class PhoneContact
    {
        [Key]
        [MaxLength(32)]
        [Phone]
        public string PhoneNumber { get; set; }

        [JsonIgnore]
        public string ContactInfoId { get; set; }

        [JsonIgnore]
        public ContactInfo ContactInfo { get; set; }
    }
}
