using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using ApiMaxima.Models;

namespace ApiMaxima.Services
{
    public class DepartamentoService
    {
        private readonly MySqlConnectionDB _mySqlConnectionDB;

        public DepartamentoService(MySqlConnectionDB mySqlConnectionDB)
        {
            _mySqlConnectionDB = mySqlConnectionDB;
        }

        public List<Departamento> ObterTodosDepartamentos()
        {
            List<Departamento> departamentos = new List<Departamento>();

            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "SELECT * FROM Departamentos";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        connection.Open();
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Departamento departamento = LerDepartamento(reader);
                                departamentos.Add(departamento);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter todos os departamentos: {ex.Message}");
            }

            return departamentos;
        }

        public Departamento ObterDepartamentoPorCodigo(string codigo)
        {
            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "SELECT * FROM Departamentos WHERE Codigo = @Codigo";
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Codigo", codigo);
                        connection.Open();
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                Departamento departamento = LerDepartamento(reader);
                                return departamento;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter departamento por código: {ex.Message}");
            }

            return null;
        }

        public void CadastrarDepartamento(Departamento departamento)
        {
            if (departamento == null)
                throw new ArgumentNullException(nameof(departamento), "Departamento não pode ser nulo");

            try
            {
                if (ObterDepartamentoPorCodigo(departamento.Codigo) != null)
                    throw new InvalidOperationException($"Já existe um departamento com o código {departamento.Codigo}");

                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "INSERT INTO Departamentos (Codigo, Descricao) " +
                                   "VALUES (@Codigo, @Descricao)";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Codigo", departamento.Codigo);
                        command.Parameters.AddWithValue("@Descricao", departamento.Descricao);

                        connection.Open();
                        command.ExecuteNonQuery();

                        Console.WriteLine($"Departamento {departamento.Codigo} cadastrado com sucesso.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao cadastrar departamento: {ex.Message}");
            }
        }

        public async Task<bool> EditarDepartamento(Departamento departamento)
        {
            if (departamento == null)
                throw new ArgumentNullException(nameof(departamento), "Departamento não pode ser nulo");

            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    string query = "UPDATE Departamentos SET Descricao = @Descricao WHERE Codigo = @Codigo";

                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Descricao", departamento.Descricao);
                        command.Parameters.AddWithValue("@Codigo", departamento.Codigo);

                        await connection.OpenAsync();
                        int rowsAffected = await command.ExecuteNonQueryAsync();

                        if (rowsAffected > 0)
                        {
                            Console.WriteLine($"Departamento {departamento.Codigo} editado com sucesso.");
                            return true;
                        }
                        else
                        {
                            Console.WriteLine($"Nenhum departamento foi editado para o código {departamento.Codigo}.");
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao editar departamento: {ex.Message}");
                throw;
            }
        }
               
        public async Task<bool> DeletarTodosDepartamentos()
        {
            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    await connection.OpenAsync();

                    if (await DepartamentosTemProdutosVinculados(connection))
                    {
                        Console.WriteLine("Não é possível deletar todos os departamentos pois existem produtos vinculados.");
                        return false;
                    }

                    string query = "DELETE FROM Departamentos";
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        int rowsAffected = await command.ExecuteNonQueryAsync();

                        if (rowsAffected > 0)
                        {
                            Console.WriteLine("Todos os departamentos foram deletados com sucesso.");
                            return true;
                        }
                        else
                        {
                            Console.WriteLine("Nenhum departamento foi deletado.");
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao deletar todos os departamentos: {ex.Message}");
                throw;
            }
        }

        private Departamento LerDepartamento(MySqlDataReader reader)
        {
            Departamento departamento = new Departamento
            {
                Codigo = reader["Codigo"].ToString(),
                Descricao = reader["Descricao"].ToString()
            };
            return departamento;
        }

        private async Task<bool> DepartamentosTemProdutosVinculados(MySqlConnection connection)
        {
            try
            {
                string query = "SELECT COUNT(*) FROM Produtos";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    int count = Convert.ToInt32(await command.ExecuteScalarAsync());
                    return count > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao verificar produtos vinculados a algum departamento: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeletarDepartamento(string codigo)
        {
            try
            {
                using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
                {
                    await connection.OpenAsync();

                    if (await DepartamentoTemProdutosVinculados(connection, codigo))
                    {
                        Console.WriteLine($"Não é possível deletar o departamento {codigo} pois existem produtos vinculados.");
                        return false;
                    }

                    string query = "DELETE FROM Departamentos WHERE Codigo = @Codigo";
                    using (MySqlCommand command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Codigo", codigo);

                        int rowsAffected = await command.ExecuteNonQueryAsync();

                        if (rowsAffected > 0)
                        {
                            Console.WriteLine($"Departamento {codigo} deletado com sucesso.");
                            return true;
                        }
                        else
                        {
                            Console.WriteLine($"Nenhum departamento foi deletado para o código {codigo}.");
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao deletar departamento: {ex.Message}");
                throw;
            }
        }

        private async Task<bool> DepartamentoTemProdutosVinculados(MySqlConnection connection, string codigo)
        {
            try
            {
                string query = "SELECT COUNT(*) FROM Produtos WHERE DepartamentoCodigo = @Codigo";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Codigo", codigo);

                    int count = Convert.ToInt32(await command.ExecuteScalarAsync());
                    return count > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao verificar produtos vinculados ao departamento: {ex.Message}");
                throw;
            }
        }

        private async Task<bool> ProdutosVinculadosAoDepartamento(MySqlConnection connection, string codigo)
        {
            try
            {
                string query = "SELECT COUNT(*) FROM Produtos WHERE DepartamentoCodigo = @Codigo";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Codigo", codigo);
                    int count = Convert.ToInt32(await command.ExecuteScalarAsync());
                    return count > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao verificar produtos vinculados ao departamento {codigo}: {ex.Message}");
                throw;
            }
        }

    }
}
