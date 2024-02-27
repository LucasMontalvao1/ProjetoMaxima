namespace ApiMaxima.Models
{
    public class Produto
    {
        public int ID { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public string DepartamentoCodigo { get; set; }
        public double Preco { get; set; }
        public int Status { get; set; }
        public int Inutilizavel { get; set; }
    }
}
