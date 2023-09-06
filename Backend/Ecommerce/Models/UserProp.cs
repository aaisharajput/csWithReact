using System.Numerics;

namespace Ecommerce.Models
{
    public class UserProp
    {
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public char Verified { get; set; }
        public string? Token { get; set; }
    }
}
