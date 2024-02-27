using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using ApiMaxima.Models;

namespace ApiMaxima.Services
{
    public class ProdutoService
    {
        private readonly MySqlConnectionDB _mySqlConnectionDB;

        public ProdutoService(MySqlConnectionDB mySqlConnectionDB)
        {
            _mySqlConnectionDB = mySqlConnectionDB;
        }

        public List<Produto> ObterTodosProdutos()
        {
            List<Produto> produtos = new List<Produto>();

            using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
            {
                string query = "SELECT * FROM Produtos";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Produto produto = new Produto
                            {
                                ID = Convert.ToInt32(reader["ID"]),
                                Codigo = reader["Codigo"].ToString(),
                                Descricao = reader["Descricao"].ToString(),
                                DepartamentoCodigo = reader["DepartamentoCodigo"].ToString(),
                                Preco = Convert.ToDouble(reader["Preco"]),
                                Status = Convert.ToInt32(reader["Status"]),
                                Inutilizavel = Convert.ToInt32(reader["Inutilizavel"])
                            };
                            produtos.Add(produto);
                        }
                    }
                }
            }

            return produtos;
        }

        public void CadastrarProduto(Produto produto)
        {
            using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
            {
                string query = "INSERT INTO Produtos (Codigo, Descricao, DepartamentoCodigo, Preco, Status, Inutilizavel) " +
                               "VALUES (@Codigo, @Descricao, @DepartamentoCodigo, @Preco, @Status, @Inutilizavel)";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Codigo", produto.Codigo);
                    command.Parameters.AddWithValue("@Descricao", produto.Descricao);
                    command.Parameters.AddWithValue("@DepartamentoCodigo", produto.DepartamentoCodigo);
                    command.Parameters.AddWithValue("@Preco", produto.Preco);
                    command.Parameters.AddWithValue("@Status", produto.Status);
                    command.Parameters.AddWithValue("@Inutilizavel", produto.Inutilizavel);

                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}