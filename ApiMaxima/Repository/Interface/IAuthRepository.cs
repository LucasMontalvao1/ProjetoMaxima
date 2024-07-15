using ApiMaxima.Models;

namespace ApiMaxima.Repository.Interface
{
    public interface IAuthRepository 
    {
        bool ValidarUsuario(string username, string password);
    }
}
