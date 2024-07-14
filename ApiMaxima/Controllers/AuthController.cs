using Microsoft.AspNetCore.Mvc;
using ApiMaxima.Services;
using ApiMaxima.Models;

namespace ApiMaxima.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _loginService;

        public LoginController(LoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public IActionResult Authenticate(LoginModel login)
        {
            try
            {
                bool isAuthenticated = _loginService.ValidarUsuario(login.Username, login.Password);

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
