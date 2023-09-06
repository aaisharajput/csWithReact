using System.Data.SqlClient; // For SQL Server
using System.Net.Mail;
using System.Net;
using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Services
{
    class ClsVisitor : DBConn, IVisitor
    {
        public Response Login(UserProp user)
        {
            Response response = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select * from user_tbl where email='" + user.Email + "'");
                if (dreader.HasRows)
                {
                    dreader.Read();
                    string verified = (string)dreader["verified"];
                    string pswd = (string)dreader["pswd"];

                    if (verified=="1")
                    {
                        if (!BCrypt.Net.BCrypt.Verify(user.Password, pswd))
                        {
                            response.Status = 400;
                            response.Message = "Incorrect Password. Try again!!";
                        }
                        else
                        {
                            user.UserId = (int)dreader["user_id"];
                            user.Username = (string)dreader["username"];
                            response.Username= (string)dreader["username"];
                            response.Email= (string)dreader["email"];   
                            response.Status = 200;
                        }
                    }
                    else
                    {
                        Random rnd = new Random();
                        string token= rnd.Next(1000000).ToString();
                       // string token = DateTime.Now.ToString("yyyyMMddHHmmss");
                        ExecuteQuery("update user_tbl set mail_token='"+token+"' where email='"+user.Email+"'");
                        response = SendMailOtp("ApnaBazaar: Email Verification", token, user.Email);
                        response.Status = 100;
                        response.Message = "Email is not verified. Otp is send on your email, verify first.";
                    }                    

                    CloseReader(dreader);
                }
                else
                {
                    response.Status = 400;
                    response.Message = "Email is not registerd. Signup first!!";
                }
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = ex.Message;
            }

            return response;
        }

        public Response Signup(UserProp user)
        {
            Response response = new();
            Random rnd = new Random();
            string token = rnd.Next(1000000).ToString();
            //string token = DateTime.Now.ToString("yyyyMMddHHmmss");
            try
            {
                SqlDataReader dreader = SelectQuery("select * from user_tbl where email='" + user.Email + "'");
                if (dreader.HasRows)
                {
                    response.Status = 400;
                    response.Message = "Account already exist!! Try another email";
                }
                else
                {
                    user.Password= BCrypt.Net.BCrypt.HashPassword(user.Password);
                    ExecuteQuery("insert into user_tbl(username,email,pswd,mail_token) values('" + user.Username + "','" + user.Email + "','" + user.Password + "','"+token+"')");
                    response= SendMailOtp("ApnaBazaar: Email Verification", token,user.Email);
                   
                }
                CloseReader(dreader);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message+token;
            }

            return response;
        }

        public Response ForgotPassword(string email)
        {
            Response response = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select * from user_tbl where email='" + email + "'");
                if (dreader.HasRows)
                {
                    Random rnd = new Random();
                    string token = rnd.Next(1000000).ToString();
                    //string token = DateTime.Now.ToString("yyyyMMddHHmmss");
                    ExecuteQuery("update user_tbl set mail_token='" + token + "' where email='" + email + "'");
                    response = SendMailOtp("ApnaBazaar: Forgot password",token, email);
                    response.Status = 200;
                    response.Message = "Otp is send on your email, verify first to recover the password.";

                    CloseReader(dreader);
                }
                else
                {
                    response.Status = 400;
                    response.Message = "Invalid Email/Email is not registerd";
                }
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
            }
            return response;
        }

        private Response SendMailOtp(string subject,string OTP,string email)
        {
            Response response = new();
            MailMessage mailMessage = new();
            mailMessage.From = new MailAddress("shoponapnabazaar@gmail.com");
            mailMessage.To.Add(email);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = "<p>OTP is "+OTP+" . Please don't share it.</p>";

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
            response.Message = "Verify user mail. "+OTP;
            response.Status = 200;

            return response;
        }

        public JsonResult ConfirmOTP(string OTP,string email)
        {
            Response response = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select mail_token from user_tbl where email='" + email + "'");
                if (dreader.HasRows)
                {
                    dreader.Read();
                    if (OTP == (string)dreader["mail_token"])
                    {
                        ExecuteQuery("update user_tbl set verified="+1+"where email='"+email+"'");
                        response.Message = "Mail verified!!";
                        response.Status = 200;
                    }
                    else
                    {
                        response.Message = "OTP is not matched";
                        response.Status = 400;
                    }
                }
                else
                {
                    response.Message = "Invalid user!!";
                    response.Status = 400;

                }
                CloseReader(dreader);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
            }
            return new JsonResult(response);
        }

        public JsonResult ConfirmEmailOTP(string OTP, string email)
        {
            Response response = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select mail_token from user_tbl where email='" + email + "'");
                if (dreader.HasRows)
                {
                    dreader.Read();
                    if (OTP == (string)dreader["mail_token"])
                    {
                        response.Message = "OTP Verified";
                        response.Status = 200;
                    }
                    else
                    {
                        response.Message = "OTP is not matched";
                        response.Status = 400;
                    }
                }
                else
                {
                    response.Message = "Invalid user!!";
                    response.Status = 400;

                }
                CloseReader(dreader);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
            }
            return new JsonResult(response);
        }

        /*
        public JsonResult VerifyEmailForgotPassword(string OTP, string email)
        {
            Response response = new();
            try
            {
                SqlDataReader dreader = SelectQuery("select mail_token from user_tbl where email='" + email + "'");
                if (dreader.HasRows)
                {
                    dreader.Read();
                    if (OTP == (string)dreader["mail_token"])
                    {
                        response.Message = "Recover your password";
                        response.Status = 200;
                    }
                    else
                    {
                        response.Message = "OTP is not matched";
                        response.Status = 400;
                    }
                }
                else
                {
                    response.Message = "Invalid user!!";
                    response.Status = 400;

                }
                CloseReader(dreader);
            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
            }
            return new JsonResult(response);
        }
        */
        /*
        public JsonResult RecoverForgotPassword(string password, string email)
        {
            Response response = new();
            try
            {
                ClsUser user = new ClsUser();
                password = BCrypt.Net.BCrypt.HashPassword(password); ;
                ExecuteQuery("update user_tbl set pswd='" + password + "' where email='" + email + "'");

                    response = user.SendMail(email);

            }
            catch (Exception ex)
            {
                response.Status = 400;
                response.Message = "error: " + ex.Message;
            }
            return new JsonResult(response);
        }
        */
        // public bool Validation()
        // {
        // if (Regex.IsMatch(Username, @"[0-9!#$%^&*()=+*/}{?/><`~]"))
        /*    {
                Console.WriteLine("Username should have characters only!!");
                return false;
           }
        */
        //   else if (!(Regex.IsMatch(Email, @"[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$")) || Regex.IsMatch(Email, @"[!#$%^&*()=+*/}{?/><`~]"))
        /*    {
                 Console.WriteLine("Email is not valid!!");
                 return false;
             }
             else if (Password.Length < 8)
             {
                 Console.WriteLine("*Password should have 8 or more characters!!");
                 return false;
             }
             else if (!(Regex.IsMatch(Password, @"(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]")))
             {
                 Console.WriteLine("*Password should contain atleast one special symbols!!");
                 return false;
             }
             else if (!(Regex.IsMatch(Password, @"(?=.*\d)")))
             {
                 Console.WriteLine("*Password should contain atleast one number!!");
                 return false;
             }
             else if (!(Regex.IsMatch(Password, @"(?=.*[A-Z])")))
             {
                 Console.WriteLine("*Password should contain atleast one Uppercase character!!");
                 return false;
             }
             else if (!(Regex.IsMatch(Password, @"(?=.*[a-z])")))
             {
                 Console.WriteLine("*Password should contain atleast one Lowercase character!!");
                 return false;
             }
             else if (Password != Confirm)
             {
                 Console.WriteLine("Confirm password not match!!");
                 return false;
             }
             else
             {
                 return true;
             }

         } */

    }

}
