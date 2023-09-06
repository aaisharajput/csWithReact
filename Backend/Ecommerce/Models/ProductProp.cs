namespace Ecommerce.Models
{
    public class ProductProp
    {
        public DateTime Date { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? Img { get; set; }
        public int Price { get; set; }
        public int Limit { get; set; }
        public string? Color { get; set; }
        public string? ProductDetails { get; set; }
    }
}
