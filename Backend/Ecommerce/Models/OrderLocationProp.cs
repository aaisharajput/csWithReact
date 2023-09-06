namespace Ecommerce.Models
{
    public class OrderLocationProp
    {
        public int LocId { get; set; }
        public int OrderId { get; set; }
        public string? CurrentLocation { get; set; }
        public string? Note { get; set;}
        public DateTime Date { get; set; }
    }
}
