namespace Ecommerce.Models
{
    public class AddressProp
    {
        public int AddressId { get; set; }
        public int UserId { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PinCode { get; set; }
        public string? PhoneNumber { get; set; }
        public string? AlterPhoneNumber { get; set; }
        public string? Token { get; set; }
    }
}
