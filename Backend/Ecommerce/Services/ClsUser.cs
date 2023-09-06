using Ecommerce.Models;
using System.Collections;
using System.Data.SqlClient; // For SQL Server
using System.Net.Mail;
using System.Net;
using Response = Ecommerce.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Ecommerce.Services
{
    class ClsUser : DBConn, IUser
    {
        public JsonResult ChangePassword(UserProp user)
        {
            Response response = new();
            try
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                ExecuteQuery("update user_tbl set pswd='" + user.Password + "' where email='" + user.Email+"'");
                response=SendMail(user.Email);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "Error Occured: " + ex.Message;
            }

            return new JsonResult(response);
        }

        public Response SendMail(string email) {
            Response response = new();
            MailMessage mailMessage = new();
            mailMessage.From = new MailAddress("shoponapnabazaar@gmail.com");
            mailMessage.To.Add(email);
            mailMessage.Subject = "ApnaBazaar";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = "<p>Your password changed successfully!!</p>";

            SmtpClient smtpClient = new()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("shoponapnabazaar@gmail.com", "tcspslxsmncrajkh"),
                EnableSsl = true
                //    DeliveryMethod = SmtpDeliveryMethod.Network
            };

                smtpClient.Send(mailMessage);
                response.Message = "Password changed Successfully.";
                response.Status = 200;

            return response;
        }

        public JsonResult LoadMoreProduct(int limit)
        {
            Response response = new();
            DataTable table = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select * from product_tbl order by product_id OFFSET " + limit + " rows fetch next 6 rows only;");
                if (dreader.HasRows)
                {
                    table.Load(dreader);
                    response.Status = 200;
                    response.Message = "Product detailes fetched";
                    response.Data = table;

                }
                else
                {
                    response.Status = 100;
                    response.Message = "No More Products";
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
            DataTable table = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select * from product_tbl where product_id=" + id);
                if (dreader.HasRows)
                {
                    table.Load(dreader);
                    response.Status = 200;
                    response.Message = "fetched single products";
                    response.Data = table;
                    CloseReader(dreader);
                }
                else
                {
                    response.Status = 100;
                    response.Message = "No More Products";
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

        public JsonResult AmountToPay(int id)
        {
            Response response = new();
            DataTable table = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select count(user_id) as item,sum(p.price*c.quantity) as amount from cart_tbl c join product_tbl p on c.product_id=p.product_id where user_id=" + id);
                if (dreader.HasRows)
                {
                    table.Load(dreader);
                    response.Status = 200;
                    response.Message = "fetched amount details";
                    response.Data = table;
                    CloseReader(dreader);
                }
                else
                {
                    response.Status = 100;
                    response.Message = "Empty cart";
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

        public JsonResult SellerList()
        {
            Response response = new();
            DataTable table = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select s.seller_id,sp.product_id,s.s_name,sp.discount,sp.shipping_charges,sp.stock from product_sell_seller sp join cart_tbl c on sp.product_id=c.product_id join seller_details s on sp.seller_id=s.seller_id");
                if (dreader.HasRows)
                {
                    table.Load(dreader);
                    response.Status = 200;
                    response.Message = "fetched seller details";
                    response.Data = table;
                    CloseReader(dreader);
                }
                else
                {
                    response.Status = 100;
                    response.Message = "Empty seller";
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

        public JsonResult UserDetails(int id)
        {
            Response response = new();
            DataTable table = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select address,city,state,zipcode from user_address where user_id=" + id);
                List<AddressProp> addressList = new();
                if (dreader.HasRows)
                {
                    table.Load(dreader);
                    response.Status = 200;
                    response.Message = "fetched user details";
                    response.Data = table;
                    CloseReader(dreader);
                }
                else
                {
                    response.Status = 100;
                    response.Message = "Data not available";
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

        public JsonResult CartItems(int id)
        {
            Response response = new();
            DataTable table = new();
            try
            {
                ArrayList productsList = new();

                SqlDataReader dreader = SelectQuery(@$"select p.product_id,p.p_name,p.img,p.price,p.color,p.p_details,c.cart_id,c.quantity,s.s_name from product_tbl p 
                                            join cart_tbl c on c.product_id=p.product_id join seller_details s on c.seller_id=s.seller_id where c.user_id={id}");
                if (dreader.HasRows)
                {
                    table.Load(dreader);

                    CloseReader(dreader);
                    response.Status = 200;
                    response.Message = "fetched Cart products";
                    response.Data=table;
                }
                else
                {
                    response.Status = 100;
                    response.Message = "Cart is empty!!";
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

        public JsonResult OrderBillDetails(Tokens id)
        {
            Response response = new();
            DataTable table = new();
            try
            {
                ArrayList productsList = new();

                SqlDataReader dreader = SelectQuery("select p.p_name,p.color,p.img,ord.transaction_id,p.price,ord.order_date,o.delivered_date,ord.amount,o.quantity,ord.payment_mode,ord.payment_status,u.username,a.address,a.city,a.state,a.zipcode,s.s_name,s.address as s_address,s.phone_no as s_phone,sp.shipping_charges,sp.discount,p.price-(p.price*sp.discount/100) as seller_price from order_details o join order_tbl ord on o.order_id=ord.order_id join product_tbl p on o.product_id=p.product_id join user_tbl u on ord.user_id=u.user_id join user_address a on ord.address_id=a.address_id join seller_details s on o.seller_id=s.seller_id join product_sell_seller sp on o.seller_id=sp.seller_id  where o.product_id="+id.ProductId+" and o.order_id="+id.OrderId+" and sp.product_id=" + id.ProductId);
                if (dreader.HasRows)
                {
                    table.Load(dreader);

                    CloseReader(dreader);
                    response.Status = 200;
                    response.Message = "fetched bill details";
                    response.Data = table;
                }
                else
                {
                    response.Status = 100;
                    response.Message = "bill is empty!!";
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

        public JsonResult ContactDetails(Tokens id)
        {
            Response response = new();
            DataTable table = new();
            try
            {
                ArrayList productsList = new();

                SqlDataReader dreader = SelectQuery("select c.phone_no from contact c join order_tbl o on o.address_id=c.address_id where o.order_id="+id.OrderId);
                if (dreader.HasRows)
                {
                    table.Load(dreader);

                    CloseReader(dreader);
                    response.Status = 200;
                    response.Message = "fetched contact details";
                    response.Data = table;
                }
                else
                {
                    response.Status = 100;
                    response.Message = "contact is empty!!";
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

        public JsonResult MyOrder(int id,string status)
        {
            Response response = new();
            DataTable table = new();
            try
            {
                ArrayList productsList = new();

                SqlDataReader dreader = SelectQuery("select o.delivered_date,o.product_id,o.order_id,p.p_name,p.color,p_details,p.img from order_details o join order_tbl ord  on o.order_id=ord.order_id join product_tbl p on o.product_id=p.product_id where ord.user_id="+id+" and o.status='"+status+"'");
                if (dreader.HasRows)
                {
                    table.Load(dreader);

                    CloseReader(dreader);
                    response.Status = 200;
                    response.Message = "fetched My Order";
                    response.Data = table;
                }
                else
                {
                    response.Status = 100;
                    response.Message = "Order is empty!!";
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

        public JsonResult AddProductToCart(int user_id, int product_id)
        {
            Response response = new();

            try
            {
                response = AddProductToCartProcedure(user_id, product_id);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
            }
            return new JsonResult(response);
        }

        public JsonResult UserAddress(int id,AddressProp address)
        {
            Response response = new();
            
            try
            {
                response= AddressProcedure(id,address);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
            }
            return new JsonResult(response);
        }

        public JsonResult OrderPlacedDetails(int id, OrderDetailsProp order)
        {
            Response response = new();

            try
            {
                response = OrderPlacedProcedure(id, order);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
            }
            return new JsonResult(response);
        }

        public JsonResult ChangeQuantity(int id, int operation)
        {
            Response response = new();

            try
            {
                response = ChangeQuantityProcedure(id,operation);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
            }
            return new JsonResult(response);
        }

        public JsonResult DeleteProduct(int id)
        {
            Response response = new();
            try
            {
                ExecuteQuery("delete from cart_tbl where cart_id=" + id);
                response.Status = 200;
                response.Message = "Deleted successfully!!";
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
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
