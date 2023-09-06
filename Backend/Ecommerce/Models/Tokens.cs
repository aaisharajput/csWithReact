namespace Ecommerce.Models
{
    public class Tokens
    {
        public string? Token { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public string? OTP { get; set; }
        public string? OrderStatus { get; set; }
        public int CartId { get; set;}
        public int Operation { get; set; }
    }
}
