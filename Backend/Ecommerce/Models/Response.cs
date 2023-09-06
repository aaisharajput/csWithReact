using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace Ecommerce.Models
{
    public class Response
    {
        public int Status { get; set; }
        public string? Message { get; set; }
        public string? Token { get; set; }
        public DataTable? Data { get; set; }
        public string? Username { get; set; }
        public int UserId { get; set; }
        public string? Email { get; set; }
        public bool Login { get; set; }
    }
}
