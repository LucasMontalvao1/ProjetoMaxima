using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using MySqlConnector;
using ProjetoMaxima.Models;
using MySqlCommand = MySql.Data.MySqlClient.MySqlCommand;

namespace ProjetoMaxima.Services
{
    public class ProdutosService
    {
        private readonly MySqlConnectionDB _connection;

        public ProdutosService(MySqlConnectionDB connectionProvider)
        {
            _connection = connectionProvider;
        }

        public List<Produto> GetAllProdutos()
        {
            List<Produto> produtos = new List<Produto>();

            using (var connection = _connection.CreateConnection()) 
            {
                string query = "SELECT ID, Codigo, Descricao, DepartamentoCodigo, Preco, Status, Inutilizavel FROM Produtos";

                using (var command = new MySqlCommand(query, connection))
                {
                    connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Produto produto = new Produto
                            {
                                ID = Convert.ToInt32(reader["ID"]),
                                Codigo = reader["Codigo"].ToString(),
                                Descricao = reader["Descricao"].ToString(),
                                DepartamentoCodigo = reader["DepartamentoCodigo"].ToString(),
                                Preco = Convert.ToDecimal(reader["Preco"]),
                                Status = Convert.ToBoolean(reader["Status"]),
                                Inutilizavel = Convert.ToBoolean(reader["Inutilizavel"])
                            };

                            produtos.Add(produto);
                        }
                    }
                }
            }
            return produtos;
        }

        public void InsertProduto(Produto produto)
        {
            using(var connection = _connection.CreateConnection())
            {
                if(_connection != null)
                {
                    string query = "INSERT INTO Produtos (Codigo, Descricao, DepartamentoCodigo, Preco, Status, Inutilizavel) " +
                              "VALUES (@Codigo, @Descricao, @DepartamentoCodigo, @Preco, @Status, @Inutilizavel)";

                    var command = new MySqlCommand(query, connection);
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

        public void UpdateProduto(Produto produto)
        {
            using (var connection = _connection.CreateConnection())
            {
                if (connection != null)
                {
                    string query = "UPDATE Produtos SET Descricao = @Descricao, DepartamentoCodigo = @DepartamentoCodigo, Preco = @Preco, Status = @Status, Inutilizavel = @Inutilizavel WHERE Codigo = @Codigo";

                    var command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Descricao", produto.Descricao);
                    command.Parameters.AddWithValue("@DepartamentoCodigo", produto.DepartamentoCodigo);
                    command.Parameters.AddWithValue("@Preco", produto.Preco);
                    command.Parameters.AddWithValue("@Status", produto.Status);
                    command.Parameters.AddWithValue("@Inutilizavel", produto.Inutilizavel);
                    command.Parameters.AddWithValue("@Codigo", produto.Codigo);

                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        public Produto FindById(int id)
        {
            using (var connection = _connection.CreateConnection())
            {
                if (connection != null)
                {
                    string query = "SELECT Codigo, Descricao, DepartamentoCodigo, Preco, Status, Inutilizavel FROM Produtos WHERE ID = @ID";

                    var command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@ID", id);

                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Produto produto = new Produto
                            {
                                ID = id,
                                Codigo = reader["Codigo"].ToString(),
                                Descricao = reader["Descricao"].ToString(),
                                DepartamentoCodigo = reader["DepartamentoCodigo"].ToString(),
                                Preco = Convert.ToDecimal(reader["Preco"]),
                                Status = Convert.ToBoolean(reader["Status"]),
                                Inutilizavel = Convert.ToBoolean(reader["Inutilizavel"])
                            };
                            return produto;
                        }
                    }
                }
                return null;
            }
        }

        public void RemoveProduto(int id)
        {
            using (var connection = _connection.CreateConnection())
            {
                if (connection != null)
                {
                    string query = "UPDATE Produtos SET Inutilizavel = @Inutilizavel WHERE id = @id";

                    var command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@Inutilizavel", true);
                    command.Parameters.AddWithValue("@id", id);

                    connection.Open();
                    command.ExecuteNonQuery();
                }
                else
                {
                    throw new Exception("Não foi possível estabelecer a conexão com o banco de dados.");
                }
            }
        }
    }
}
