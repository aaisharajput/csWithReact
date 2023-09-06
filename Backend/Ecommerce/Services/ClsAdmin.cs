using Ecommerce.Models;
using System.Data;
using System.Data.SqlClient; // For SQL Server
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Ecommerce.Services
{
    class ClsAdmin : DBConn, IAdmin
    {
        public JsonResult AddSeller(SellerProp seller)
        {
            Response response = new();
            try
            {
                ExecuteQuery("insert into seller_details(s_name,phone_no,address) values('" + seller.SellerName + "','" + seller.PhoneNumber + "','" + seller.Address + "')");
                response.Status = 200;
                response.Message = "Seller Inserted successfully!!";
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
            }

            return new JsonResult(response);
        }

        public JsonResult LoadAdminProduct()
        {
            Response response = new();
            DataTable table = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select * from product_tbl");
                if (dreader.HasRows)
                {
                    table.Load(dreader);
                    response.Status = 200;
                    response.Data = table;
                    response.Message = "Product detailes fetched";

                }
                else
                {
                    response.Status = 100;
                    response.Message = "Product not available";
                    response.Data = null;
                }
                CloseReader(dreader);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
                response.Data = null;
            }

            return new JsonResult(response);

        }

        public JsonResult ProductDetails(int id)
        {
            Response response = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select * from product_tbl where product_id=" + id);
                List<ProductProp> productsList = new();
                DataTable table = new();
                if (dreader.HasRows)
                {
                    table.Load(dreader);
                    response.Status = 200;
                    response.Data = table;
                    response.Message = "Product detailes fetched";
                    CloseReader(dreader);
                }
                else
                {
                    response.Status = 100;
                    response.Message = "Product is not available";
                    response.Data = null;
                }

            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
                response.Data = null;
            }

            return new JsonResult(response);
        }

        public JsonResult AddProduct(ProductProp product)
        {
            Response response = new();
            try
            {
                ExecuteQuery("insert into product_tbl(p_name,price,color,p_details) values('" + product.ProductName + "','" + product.Price + "','" + product.Color + "','" + product.ProductDetails + "')");
                response.Status = 200;
                response.Message = "Inserted successfully!!";
                response.Data = null;
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
                response.Data = null;
            }

            return new JsonResult(response);
        }

        public JsonResult DeleteProduct(int id)
        {
            Response response = new();
            try
            {
                ExecuteQuery("delete from product_tbl where product_id=" + id);
                response.Status = 200;
                response.Message = "Deleted successfully!!";
                response.Data = null;
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
                response.Data = null;
            }

            return new JsonResult(response);
        }

        public JsonResult UpdateProduct(ProductProp product, int id)
        {
            Response response = new();
            try
            {
                ExecuteQuery("update product_tbl set p_name='" + product.ProductName + "',img='" + product.Img + "',price=" + product.Price + ",color='" + product.Color + "',p_details='" + product.ProductDetails + "' where product_id=" + id);
                response.Status = 200;
                response.Message = "Updated successfully!!";
                response.Data = null;
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
                response.Data = null;
            }

            return new JsonResult(response);
        }

        public JsonResult Logout()
        {
            Response response = new();
            response.Status = 200;
            response.Message = "Logout Successfully!!";
            response.Login = false;
            return new JsonResult(response);
        }
    }

}
