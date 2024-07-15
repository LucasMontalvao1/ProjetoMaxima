using ApiMaxima.Repository.Interface;
using ApiMaxima.Service.Interface;

namespace ApiMaxima.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public bool ValidarUsuario(string username, string password)
        {
            return _authRepository.ValidarUsuario(username, password);
        }
    }
}
