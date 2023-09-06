namespace Ecommerce.Models
{
    public class CartProp
    {
        public int CartId { get; set; }
        public int UserId { get; set;}
        public int ProductId { get; set;}
        public int Quantity { get; set;}
        public int SellerId { get; set;}
    }
}
