using Microsoft.AspNetCore.Mvc;
using ApiMaxima.Services;
using ApiMaxima.Models;
using ApiMaxima.Service.Interface;

namespace ApiMaxima.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;

        public LoginController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public IActionResult Authenticate(LoginModel login)
        {
            try
            {
                bool isAuthenticated = _authService.ValidarUsuario(login.Username, login.Password);

                if (isAuthenticated)
                {
                    return Ok("Login feito com sucesso!");
                }
                else
                {
                    return Unauthorized("Usuario ou senha incorretos");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"IOps, ocorreu um erro: {ex.Message}");
            }
        }
    }
}
