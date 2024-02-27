using System.ComponentModel.DataAnnotations;

namespace ProjetoMaxima.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Digite o login")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Digite a Senha")]
        public string Senha { get; set; }
    }
}
