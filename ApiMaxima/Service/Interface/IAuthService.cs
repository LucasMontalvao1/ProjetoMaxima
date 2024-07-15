namespace ApiMaxima.Service.Interface
{
    public interface IAuthService
    {
        bool ValidarUsuario(string username, string password);
    }
}
