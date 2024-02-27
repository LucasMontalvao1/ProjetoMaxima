
namespace ProjetoMaxima.Models
{
    public class Departamento
    {
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public ICollection<Produto> Produtos { get; set; } = new List<Produto>();

        public Departamento() { }

        public Departamento(string codigo, string descriacao)
        {
            Codigo = codigo;
            Descricao = descriacao;
        }
    }
}
