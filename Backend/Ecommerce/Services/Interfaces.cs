using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Ecommerce.Services
{

    public interface ICommon
    {
        JsonResult ProductDetails(int id);
        JsonResult DeleteProduct(int id);
        JsonResult Logout();

    }

    public interface IVisitor
    {
        Response Login(UserProp user);
        Response Signup(UserProp user);
        Response ForgotPassword(string email);

    }

    public interface IUser : ICommon
    {
        JsonResult AddProductToCart(int user_id, int product_id);
        JsonResult ChangePassword(UserProp user);
        JsonResult ChangeQuantity(int id, int operation);

    }

    public interface IAdmin : ICommon
    {
        JsonResult AddProduct(ProductProp product);
        JsonResult AddSeller(SellerProp seller);
        JsonResult UpdateProduct(ProductProp product, int id);

    }


    //Console.Write((string) dreader["username"] + " - " + dreader.GetValue(1) + "\n");
    /* class Program
     {
         public static void Main()
         {
              string email, password, username, confirm;
              Console.Write("Enter Name:");
              username = Console.ReadLine();
              Console.Write("Enter email:");
              email = Console.ReadLine();
              Console.Write("Enter password:");
              password = Console.ReadLine();
              Console.Write("Enter confirm password:");
              confirm = Console.ReadLine();

              ClsUser user = new ClsUser() {Email=email,Password=password };
              user.LoginUser();
              ClsVisitor visitor = new ClsVisitor() { Username=username, Email = email, Password = password, Confirm=confirm };
              if(visitor.Validation())
                 visitor.Signup();

             ClsUser user = new ClsUser();
             user.SingleProductDetails(2);

             ClsUser user = new ClsUser() { Pname = "Asus", Price=2000, Color="lavender", Pdetails="best product"};
             user.AddProduct();
             user.DeleteProduct(21);

             ClsVisitor visitor = new ClsVisitor();
             visitor.showProductDetails();
             visitor.ForgotPassword("sapna2gmail.com");
             ClsUser user = new ClsUser() { Email = "sapna2gmail.com", Password = "Sapna@123" };
             user.LoginUser();
             user.ChangeQuantity(2);
             user.Payment(1);


             //ClsVisitor v = new ClsVisitor();
            // ClsUser user = new ClsUser() { Email = "sapna2gmail.com", Password = "Ritu@123" };
           //  user.Login();

             //user.Login();

             Console.ReadKey();
         }
     }
     */
}
