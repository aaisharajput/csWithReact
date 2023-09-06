using System.Data;
using Microsoft.Data.SqlClient;

namespace Ecommerce.Models
{
    public class DataAccessLayer
    {
        public Response register(UserProp users,SqlConnection conn)
        {
            Response response=new Response();
            SqlCommand cmd=new SqlCommand("sp_register",conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Username", users.Username);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Password", users.Password);
            cmd.Parameters.AddWithValue("@MailToken", users.Token);
            conn.Open();
            int i=cmd.ExecuteNonQuery();
            conn.Close();
            if (i>0)
            {
                response.Status= 200;
                response.Message = "User register successfully";
            }
            else
            {
                response.Status = 100;
                response.Message = "User registration failed";
            }
            return response;
        }

        public Response login(UserProp users, SqlConnection conn)
        {
            SqlDataAdapter da=new SqlDataAdapter("sp_login",conn);
            da.SelectCommand.CommandType=CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Email", users.Email);
            da.SelectCommand.Parameters.AddWithValue("@Password", users.Password);
            DataTable dt= new DataTable();
            da.Fill(dt);
            Response response= new Response();
            UserProp user= new UserProp();
            if (dt.Rows.Count>0)
            {
                user.UserId = Convert.ToInt32(dt.Rows[0]["user_id"]);
                user.Username = Convert.ToString(dt.Rows[0]["username"]);
                user.Verified = Convert.ToChar(dt.Rows[0]["verified"]);

                response.Status = 200;
                response.Message = "User is Valid";
                //response.User = user;
            }
            else
            {
                response.Status = 100;
                response.Message = "User is invalid";
               // response.User = null;
            }
            return response;
        }

        public Response addToCart(CartProp cart, SqlConnection conn)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_addtocart", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CartId", cart.CartId);
            cmd.Parameters.AddWithValue("@UserId", cart.UserId);
            cmd.Parameters.AddWithValue("@ProductId", cart.ProductId);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            cmd.Parameters.AddWithValue("@SellerId", cart.SellerId);
            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();
            if (i > 0)
            {
                response.Status = 200;
                response.Message = "Add to Cart successfully";
            }
            else
            {
                response.Status = 100;
                response.Message = "Add to Cart failed";
            }
            return response;
        }

        public Response productList(ProductProp products, SqlConnection conn)
        {
            Response response = new Response();
            List<ProductProp> productsList = new List<ProductProp>();
            SqlDataAdapter da= new SqlDataAdapter("sp_orderlist", conn);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Img", products.Img);
            DataTable dt= new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count>0)
            {
                for (int i=0;i<dt.Rows.Count;i++)
                {
                    ProductProp product = new ProductProp();
                    product.ProductId = Convert.ToInt32(dt.Rows[i]["product_id"]);
                    product.ProductName = Convert.ToString(dt.Rows[i]["pname"]);
                    product.Color = Convert.ToString(dt.Rows[i]["color"]);
                    product.Price = Convert.ToInt32(dt.Rows[i]["price"]);
                    product.ProductDetails = Convert.ToString(dt.Rows[i]["pdetails"]);
                    productsList.Add(product);
                }
                if (productsList.Count>0)
                {
                    response.Status = 200;
                    response.Message = "Product detailes fetched";
                   // response.ListProducts= productsList;
                }
                else
                {
                    response.Status = 100;
                    response.Message = "Product not available";
                   // response.ListProducts = productsList;
                }
                
            }
            else
            {
                response.Status = 100;
                response.Message = "Product not available";
               // response.ListProducts = null;
            }
            return response;
        }


     /*   public bool Post(Employee employee)
        {
            SqlConnection conn = new SqlConnection(@"server=DESKTOP-89HQ4RL\SQLEXPRESS;database=ReactAppDB;integrated security=true");
            string query = "insert into EmployeeInfo values(@Id,@Name,@Loc,@Sal)";
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.Add(new SqlParameter("@Id", employee.Id));
            cmd.Parameters.Add(new SqlParameter("@Name", employee.Name));
            cmd.Parameters.Add(new SqlParameter("@Loc", employee.Location));
            cmd.Parameters.Add(new SqlParameter("@Sal", employee.Salary));
            conn.Open();
            int noOfRowsAffected = cmd.ExecuteNonQuery();
            conn.Close();
            return noOfRowsAffected > 0 ? true : false;
        }*/
    }
}
