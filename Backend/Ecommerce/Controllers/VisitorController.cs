using Microsoft.AspNetCore.Mvc;
using Ecommerce.Models;
using Ecommerce.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public partial class VisitorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public VisitorController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpPost]
        [Route("signup")]
        public JsonResult Signup(UserProp users)
        {
            ClsVisitor visitor = new();
            Response response= visitor.Signup(users);
            if (response.Status == 200)
            {
                string token = GenerateToken(users);
                response.Token = token;
                response.Login = false;
            }
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("verifyOtp")]
        public JsonResult ConfirmOTP(Tokens token)
        {
            ClsVisitor visitor = new();
            Response response=ValidateToken(token.Token);
            if (response.Status == 200)
            {
                return visitor.ConfirmOTP(token.OTP, response.Email);
            }
            else
            {
                return new JsonResult(response);
            }
            
        }

        [HttpPost]
        [Route("verifyEmailOtp")]
        public JsonResult ConfirmEmailOTP(Tokens token)
        {
            ClsVisitor visitor = new();
            Response response = ValidateToken(token.Token);
            if (response.Status == 200)
            {
                return visitor.ConfirmEmailOTP(token.OTP, response.Email);
            }
            else
            {
                return new JsonResult(response);
            }

        }

        [HttpPost]
        [Route("login")]
        public JsonResult Login(UserProp users)
        {
            ClsVisitor visitor = new();
            Response response = visitor.Login(users);
            
            if (response.Status == 200)
            {
                string token = GenerateToken(users);
                response.Token = token;
                response.Message = "Save your token";
                response.Login = true;
            }else if(response.Status == 100)
            {
                string token = GenerateToken(users);
                response.Token = token;
            }

            return new JsonResult(response);
        }

        private string GenerateToken(UserProp user)
        {
            // generate token that is valid for 7 days
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:Token").Value!));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityTokenHandler().CreateToken(new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("name", user.Username.ToString()), new Claim("email", user.Email.ToString()), new Claim("id", user.UserId.ToString()), new Claim("login", "true") }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            });
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
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
                response.Username=jwtToken.Claims.First(x => x.Type == "name").Value;
                response.Email = jwtToken.Claims.First(x => x.Type == "email").Value;
                response.UserId=int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                response.Login=bool.Parse(jwtToken.Claims.First(x => x.Type == "login").Value);
                response.Status = 200;
                response.Message = "token verified!!";
                // return user id from JWT token if validation successful
                return response;
            }
            catch(Exception ex)
            {
                // return null if validation fails
                response.Status = 400;
                response.Message = "Error: "+ex.Message;
                response.Login = false;
                return response;
            }
        }

    
        [HttpPost]
        [Route("forgotPassword")]
        public JsonResult ForgotPassword(UserProp user)
        {
            
            ClsVisitor visitor = new();
            Response response = visitor.ForgotPassword(user.Email);
            if(response.Status == 200) {
                string token = GenerateToken(user);
                response.Token = token;
                response.Login = false;
            }
            else
            {
                response.Token = null;
                response.Login = false;
            }
            return new JsonResult(response);
        }
/*
        [HttpPost]
        [Route("verifyEmailForgotPassword")]
        public JsonResult VerifyEmailForgotPassword(string otp,string email)
        {
            ClsVisitor visitor = new();
            return visitor.VerifyEmailForgotPassword(otp,email);
        }
*/
/*
        [HttpPost]
        [Route("recoverForgotPassword")]
        public JsonResult RecoverForgotPassword(string password, string email)
        {
            ClsVisitor visitor = new();
            return visitor.RecoverForgotPassword(password, email);
        }*/

    }
}
