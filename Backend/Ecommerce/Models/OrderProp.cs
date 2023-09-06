namespace Ecommerce.Models
{
    public class OrderProp
    {
        public int OrderId { get; set; }
        public int UserID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public int SellerId { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DeliveredDate { get; set; }
        public string? PaymemtMode { get; set; }
        public char PaymemtStatus { get; set; }
        public string? Status { get; set; }
    }
}
