

namespace ProjetoMaxima.Models.ViewModel
{
    public class ProdutosFormViewModel
    {
        public Produto Produto {  get; set; }
        public ICollection<Departamento> Departaments { get; set; }
    }
}
