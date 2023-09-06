using Ecommerce.Models;
using Ecommerce.Services;

namespace Ecommerce.Repository
{
        public interface IJWTManagerRepository
        {
            Tokens Authenticate(UserProp users);
        }
    
}
