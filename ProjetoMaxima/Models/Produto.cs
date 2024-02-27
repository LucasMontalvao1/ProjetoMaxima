using System;
using System.ComponentModel.DataAnnotations;

namespace ProjetoMaxima.Models
{
    public class Produto
    {
        public int ID { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public string DepartamentoCodigo { get; set; }

        [Display(Name = "Preço")]
        [DataType(DataType.Currency)]
        public decimal Preco { get; set; }

        public bool Status { get; set; }
        public bool Inutilizavel { get; set; }

        public string Codoperacao => Inutilizavel ? "Ativo" : "Excluido";
    }
}
