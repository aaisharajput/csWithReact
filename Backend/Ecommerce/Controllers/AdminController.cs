using Ecommerce.Models;
using Ecommerce.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpPost]
        [Route("add_seller")] 
        public JsonResult AddSeller(SellerProp seller)
        {
            ClsAdmin admin = new();
            return admin.AddSeller(seller);
        }

        [HttpGet]
        [Route("loadAdminProduct")]
        public JsonResult LoadAdminProduct()
        {
            ClsAdmin admin = new();
            return admin.LoadAdminProduct();
            
        }

        [HttpPost]
        [Route("adminProductDetails")]
        public JsonResult ProductDetails(int id)
        {
            ClsAdmin admin = new();
            return admin.ProductDetails(id);
        }

        [HttpPost]
        [Route("addAdminProduct")]
        public JsonResult AddProduct(ProductProp product)
        {
            ClsAdmin admin = new();
            return admin.AddProduct(product);
        }

        [HttpPost]
        [Route("deleteAdminProduct")]
        public JsonResult DeleteProduct(int id)
        {
            ClsAdmin admin = new();
            return admin.DeleteProduct(id);
        }

        [HttpPost]
        [Route("updateProductDetails")]
        public JsonResult UpdateProduct(ProductProp product, int id)
        {
            ClsAdmin admin = new();
            return admin.UpdateProduct(product, id);
        }

        [HttpPost]
        [Route("logoutAdmin")]
        public JsonResult Logout()
        {
            ClsAdmin admin = new();
            return admin.Logout();
        }
    }
}
