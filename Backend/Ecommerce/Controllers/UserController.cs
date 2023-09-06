using Microsoft.AspNetCore.Mvc;
using Ecommerce.Models;
using Ecommerce.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /*  private readonly IConfiguration _configuration;
          public UserController(IConfiguration configuration)
          {
              _configuration = configuration;
          }

            [HttpPost]
            [Route("registration")]
            public Response Register(UserProp users)
            { 
                DataAccessLayer dal=new();
                SqlConnection conn = new(_configuration.GetConnectionString("Server=localhost;Database=apnabazaar;Trusted_Connection=True").ToString());
                Response response = dal.register(users, conn);
                return response;
            }
          */

        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }


        [HttpPost]
        [Route("changePswd")]
        public JsonResult ChangePassword(UserProp user)
        {
            ClsUser users = new();
                Response response = ValidateToken(user.Token);
                if (response.Status == 200)
                {
                    user.UserId = response.UserId;
                    user.Email = response.Email;
                    return users.ChangePassword(user);
                }
                else
                {
                    return new JsonResult(response);
                }
            

        }

        private Response ValidateToken(string token)
        {
            Response response = new();
            if (token == null)
            {
                response.Status = 440;
                response.Message = "Token is not provided";
                return response;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:Token").Value!));
            try
            {

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                response.Username = jwtToken.Claims.First(x => x.Type == "name").Value;
                response.Email = jwtToken.Claims.First(x => x.Type == "email").Value;
                response.UserId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                response.Login = bool.Parse(jwtToken.Claims.First(x => x.Type == "login").Value);
                response.Status = 200;
                response.Message = "token verified!!";
                return response;
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "Error: " + ex.Message;
                response.Login = false;
                return response;
            }
        }

        [HttpPost]
        [Route("loadProduct")]
        public JsonResult LoadMoreProduct(ProductProp product)
        {
            ClsUser users = new();
            return users.LoadMoreProduct(product.Limit);
        }
        /*
        [HttpPost]
        [Route("singleProduct")]
        public JsonResult ProductDetails(int id)
        {
            ClsUser users = new();
            return users.ProductDetails(id);
        }
        */
        /*
        [HttpPost]
        [Route("profile")]
        public JsonResult UserDetails(int id)
        {
            ClsUser users = new();
            return users.UserDetails(id);
        }
        */

        [HttpPost]
        [Route("cart")]
        public JsonResult CartItems(Tokens token)
        {

            ClsUser users = new();

                Response response = ValidateToken(token.Token);
                if (response.Status == 200)
                {
                    int id = response.UserId;
                    return users.CartItems(id);
                }
                else
                {
                    return new JsonResult(response);
                }
           
        }

        [HttpPost]
        [Route("orderBillDetails")]
        public JsonResult OrderBillDetails(Tokens token)
        {

            ClsUser users = new();

            Response response = ValidateToken(token.Token);
            if (response.Status == 200)
            {
                return users.OrderBillDetails(token);
            }
            else
            {
                return new JsonResult(response);
            }

        }


        [HttpPost]
        [Route("contactDetails")]
        public JsonResult ContactDetails(Tokens token)
        {

            ClsUser users = new();

            Response response = ValidateToken(token.Token);
            if (response.Status == 200)
            {
                return users.ContactDetails(token);
            }
            else
            {
                return new JsonResult(response);
            }

        }

        [HttpPost]
        [Route("myorder")]
        public JsonResult MyOrder(Tokens token)
        {

            ClsUser users = new();

            Response response = ValidateToken(token.Token);
            if (response.Status == 200)
            {
                int id = response.UserId;
                return users.MyOrder(id,token.OrderStatus);
            }
            else
            {
                return new JsonResult(response);
            }

        }


        [HttpPost]
        [Route("userAddress")]
        public JsonResult UserAddress(AddressProp address)
        {
            ClsUser users = new();

                Response response = ValidateToken(address.Token);
                if (response.Status == 200)
                {
                    int id = response.UserId;
                    return users.UserAddress(id,address);
                }
                else
                {
                    return new JsonResult(response);
                }
            
        }

        [HttpPost]
        [Route("orderDetails")]
        public JsonResult OrderDetails(OrderDetailsProp order)  
        {
            ClsUser users = new();

                Response response = ValidateToken(order.Token);
                if (response.Status == 200)
                {
                    int id = response.UserId;
                    return users.OrderPlacedDetails(id, order);
                }
                else
                {
                    return new JsonResult(response);
                }

        }

        [HttpPost]
        [Route("amountToPay")]
        public JsonResult AmountToPay(Tokens token)
        {
            ClsUser users = new();

                Response response = ValidateToken(token.Token);
                if (response.Status == 200)
                {
                    int id = response.UserId;
                    return users.AmountToPay(id);
                }
                else
                {
                    return new JsonResult(response);
                }

        }

        [HttpPost]
        [Route("sellerList")]
        public JsonResult SellerList(Tokens token)
        {
            ClsUser users = new();

            Response response = ValidateToken(token.Token);
            if (response.Status == 200)
            {
                int id = response.UserId;
                return users.SellerList();
            }
            else
            {
                return new JsonResult(response);
            }

        }

        [HttpPost]
        [Route("addToCart")]
        public JsonResult AddProductToCart(Tokens token)
        {
            ClsUser users = new();

                Response response = ValidateToken(token.Token);
                if (response.Status == 200)
                {

                    int id = response.UserId;
                    return users.AddProductToCart(id, token.ProductId);
                }
                else
                {
                    return new JsonResult(response);
                }

        }

        [HttpPost]
        [Route("changeQuantity")]
        public JsonResult ChangeQuantity(Tokens token)
        {
            ClsUser users = new();

                Response response = ValidateToken(token.Token);
                if (response.Status == 200)
                {
                    return users.ChangeQuantity(token.CartId, token.Operation);
                }
                else
                {
                    return new JsonResult(response);
                }
            
        }

        [HttpPost]
        [Route("deleteProduct")]
        public JsonResult DeleteProduct(Tokens token)
        {
            ClsUser users = new();

                Response response = ValidateToken(token.Token);
                if (response.Status == 200)
                {
                    int id = token.ProductId;
                    return users.DeleteProduct(id);
                }
                else
                {
                    return new JsonResult(response);
                }

        }

        [HttpPost]
        [Route("logout")]
        public JsonResult Logout()
        {
            ClsUser users = new();
            return users.Logout();
        }
    }
}
