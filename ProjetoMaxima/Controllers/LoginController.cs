using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using ProjetoMaxima.Models;
using ProjetoMaxima.Services;

namespace ProjetoMaxima.Controllers
{
    public class LoginController : Controller
    {
        private readonly MySqlConnectionDB _connectionDB;

        public LoginController(MySqlConnectionDB connectionDB)
        {
            _connectionDB = connectionDB;
        }


        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Entrar(LoginModel loginModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    using (var connection = _connectionDB.CreateConnection())
                    {
                        connection.Open();
                        if (connection.State == System.Data.ConnectionState.Open)
                        {
                            TempData["Mensagem"] = "Conectado ao banco de dados com sucesso!";
                        }
                        else
                        {
                            TempData["MensagemErro"] = "Erro ao conectar ao banco de dados.";
                            return RedirectToAction("Index");
                        }

                        string query = "SELECT COUNT(*) FROM users WHERE username = @username AND password = @password";
                        using (var command = new MySqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@username", loginModel.Login);
                            command.Parameters.AddWithValue("@password", loginModel.Senha);
                            int count = Convert.ToInt32(command.ExecuteScalar());
                            if (count > 0)
                            {
                                return RedirectToAction("Index", "Home");
                            }
                        }
                    }
                    TempData["MensagemErro"] = $"Ops, login e/ou senha Incorreto(s)!.... Por favor, tente novamente!";
                }
                return View("Index");
            }
            catch (Exception erro)
            {
                TempData["MensagemErro"] = $"Ops, login falhou! {erro.Message}";
                return RedirectToAction("Index");
            }
        }
    }
}