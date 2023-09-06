namespace Ecommerce.Models
{
    public class OrderDetailsProp
    {
        public string? Token { get; set; }
        public string? TransactionId { get; set; }
        public int AddressId { get; set; }
        public int PaymentStatus { get; set; }
        public String? PaymentMode { get; set; }
        public int Amount { get; set; }
    }
}
