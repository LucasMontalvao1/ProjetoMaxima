using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using ApiMaxima.Models;

namespace ApiMaxima.Services
{
    public class ProdutoService
    {
        private readonly MySqlConnectionDB _mySqlConnectionDB;
        private readonly DepartamentoService _departamentoService;

        public ProdutoService(MySqlConnectionDB mySqlConnectionDB, DepartamentoService departamentoService)
        {
            _mySqlConnectionDB = mySqlConnectionDB;
            _departamentoService = departamentoService;
        }

        public List<Produto> ObterTodosProdutos()
        {
            List<Produto> produtos = new List<Produto>();

            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "SELECT * FROM produtos";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        connection.Open();
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Produto produto = LerProduto(reader);
                                produtos.Add(produto);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter produtos: {ex.Message}"); 
            }

            return produtos;
        }

        private Produto LerProduto(MySqlDataReader reader)
        {
            return new Produto
            {
                ID = Convert.ToInt32(reader["ID"]),
                Codigo = reader["Codigo"].ToString(),
                Descricao = reader["Descricao"].ToString(),
                DepartamentoCodigo = reader["DepartamentoCodigo"].ToString(),
                Preco = Convert.ToDouble(reader["Preco"]),
                Status = Convert.ToInt32(reader["Status"]),
                Inutilizavel = Convert.ToInt32(reader["Inutilizavel"])
            };
        }

        public Produto ObterProdutoPorId(int id)
        {
            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "SELECT * FROM Produtos WHERE ID = @Id";
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Id", id);
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return LerProduto(reader);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter produto por ID: {ex.Message}");
            }

            return null; 
        }

        public Produto ObterProdutoPorCodigo(string codigo)
        {
            try 
            { 
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "SELECT * FROM Produtos WHERE Codigo = @Codigo";
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Codigo", codigo);
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return LerProduto(reader);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter produto por ID: {ex.Message}");
            }

            return null; 
        }

        public void CadastrarProduto(Produto produto)
        {
            try
            {
                if (produto == null)
                {
                    throw new ArgumentNullException(nameof(produto), "Produto não pode ser nulo");
                }

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
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 1)
                            Console.WriteLine("Produto cadastrado com sucesso!");
                        else
                            Console.WriteLine("Falha ao cadastrar o produto.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao cadastrar produto: {ex.Message}");
            }
        }

        public void AtualizarProduto(Produto produto)
        {
            try
            {
                if (produto == null)
                {
                    throw new ArgumentNullException(nameof(produto), "Produto não pode ser nulo");
                }

                var departamento = _departamentoService.ObterDepartamentoPorCodigo(produto.DepartamentoCodigo);
                if (departamento == null)
                {
                    throw new Exception($"Departamento com código {produto.DepartamentoCodigo} não encontrado.");
                }

                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "UPDATE Produtos SET Codigo = @Codigo, Descricao = @Descricao, " +
                                   "DepartamentoCodigo = @DepartamentoCodigo, Preco = @Preco, " +
                                   "Status = @Status, Inutilizavel = @Inutilizavel WHERE ID = @Id";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Id", produto.ID);
                        command.Parameters.AddWithValue("@Codigo", produto.Codigo);
                        command.Parameters.AddWithValue("@Descricao", produto.Descricao);
                        command.Parameters.AddWithValue("@DepartamentoCodigo", produto.DepartamentoCodigo);
                        command.Parameters.AddWithValue("@Preco", produto.Preco);
                        command.Parameters.AddWithValue("@Status", produto.Status);
                        command.Parameters.AddWithValue("@Inutilizavel", produto.Inutilizavel);

                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 1)
                            Console.WriteLine("Produto atualizado com sucesso!");
                        else
                            Console.WriteLine("Falha ao atualizar o produto.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao atualizar produto: {ex.Message}");
                throw; 
            }
        }

        public void DeletarProdutoPorId(int id)
        {
            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "DELETE FROM Produtos WHERE ID = @Id";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Id", id);

                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 1)
                            Console.WriteLine("Produto deletado com sucesso!");
                        else
                            Console.WriteLine("Falha ao deletar o produto.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao deletar produto por ID: {ex.Message}");
            }
        }


        public void DeletarProdutoPorCodigo(string codigo)
        {
            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "DELETE FROM Produtos WHERE Codigo = @Codigo";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Codigo", codigo);

                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 1)
                            Console.WriteLine($"Produto com código {codigo} deletado com sucesso!");
                        else
                            Console.WriteLine($"Falha ao deletar o produto com código {codigo}.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao deletar produto por código: {ex.Message}");
            }
        }

        public void DeletarTodosProdutos()
        {
            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "DELETE FROM Produtos";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        Console.WriteLine($"{rowsAffected} produtos deletados com sucesso!");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao deletar todos os produtos: {ex.Message}");
            }
        }
    }
}