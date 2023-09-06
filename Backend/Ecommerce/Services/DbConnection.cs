using Azure;
using Ecommerce.Models;
using System;
using System.Data;
using System.Data.SqlClient;
using Response = Ecommerce.Models.Response;

namespace Ecommerce.Services
{
    class DBConn
    {
        private static readonly SqlConnection? conn;
        static DBConn()
        {
            string constr = "Server=localhost;Database=apnabazaar;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true;encrypt=false";
            conn = new SqlConnection(constr);
            conn.Open();
            Console.WriteLine("Connected");
        }

        public SqlDataReader SelectQuery(string sql)
        {
            SqlCommand cmd = new (sql, conn);
            SqlDataReader dreader;
           
            dreader = cmd.ExecuteReader();
            cmd.Dispose();
            return dreader;

        }

        public Response AddressProcedure(int userId,AddressProp address)
        {
            Response response = new();
            SqlCommand cmd = new("sp_addAddress", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@user_id", userId);
            cmd.Parameters.AddWithValue("@address", address.Address);
            cmd.Parameters.AddWithValue("@city", address.City);
            cmd.Parameters.AddWithValue("@state", address.State);
            cmd.Parameters.AddWithValue("@pincode", address.PinCode);
            cmd.Parameters.AddWithValue("@phone", address.PhoneNumber);
            cmd.Parameters.AddWithValue("@alter_phone", address.AlterPhoneNumber);
            SqlParameter returnVALUE = cmd.Parameters.Add("return", SqlDbType.Int);
            returnVALUE.Direction = ParameterDirection.ReturnValue;
            cmd.ExecuteNonQuery();
            int address_id = (int)returnVALUE.Value;
            if (address_id > -1)
            {
                
                response.Status = 200;
                response.Message =address_id.ToString();
            }
            else
            {
                response.Status = 100;
                response.Message = "Address ID not fetched";

            }

            return response;
        }

        public Response OrderPlacedProcedure(int userId, OrderDetailsProp order)
        {
            Response response = new();
            SqlCommand cmd = new("sp_orderPlaced", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@user_id", userId);
            cmd.Parameters.AddWithValue("@address_id", order.AddressId);
            cmd.Parameters.AddWithValue("@payment_status", order.PaymentStatus);
            cmd.Parameters.AddWithValue("@payment_mode", order.PaymentMode);
            cmd.Parameters.AddWithValue("@transaction_id", order.TransactionId);
            cmd.Parameters.AddWithValue("@amount", order.Amount);
            cmd.ExecuteNonQuery();

            response.Status = 200;
            response.Message = "Order Placed";
            
            return response;
        }

        public Response AddProductToCartProcedure(int userId, int productId)
        {
            Response response = new();
            SqlCommand cmd = new("sp_addToCart", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@user_id", userId);
            cmd.Parameters.AddWithValue("@product_id", productId);
            cmd.ExecuteNonQuery();

            response.Status = 200;
            response.Message = "Order Placed";

            return response;
        }

        public Response ChangeQuantityProcedure(int cartId, int operation)
        {
            Response response = new();
            SqlCommand cmd = new("sp_changeQuantity", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@cart_id", cartId);
            cmd.Parameters.AddWithValue("@operation", operation);
            SqlParameter returnVALUE = cmd.Parameters.Add("return", SqlDbType.Int);
            returnVALUE.Direction = ParameterDirection.ReturnValue;
            cmd.ExecuteNonQuery();
            int quantity = (int)returnVALUE.Value;
            if (quantity >1)
            {
                response.Status = 200;
                response.Message = "Updated quantity";
            }
            else
            {
                response.Status = 100;
                response.Message = "Limit Reached";
            }
            return response;
        }

        public void ExecuteQuery(string sql)
        {
            SqlCommand cmd = new SqlCommand(sql, conn);
            
            int result = cmd.ExecuteNonQuery();
           
        }

        public void CloseReader(SqlDataReader dreader)
        {
            dreader.Close();

        }

    }
}