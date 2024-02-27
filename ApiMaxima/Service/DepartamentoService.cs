﻿using System;
using System.Collections.Generic;
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
                            Departamento departamento = new Departamento
                            {
                                Codigo = reader["Codigo"].ToString(),
                                Descricao = reader["Descricao"].ToString()
                            };
                            departamentos.Add(departamento);
                        }
                    }
                }
            }
            return departamentos;
        }

        public void CadastrarDepartamento(Departamento departamento)
        {
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
                }
            }
        }

        public async Task<bool> EditarDepartamento(Departamento departamento)
        {
            using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
            {
                string query = "UPDATE Departamentos SET Descricao = @Descricao WHERE Codigo = @Codigo";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Descricao", departamento.Descricao);
                    command.Parameters.AddWithValue("@Codigo", departamento.Codigo);

                    await connection.OpenAsync(); // Abra a conexão de forma assíncrona
                    int rowsAffected = await command.ExecuteNonQueryAsync(); // Execute a consulta de forma assíncrona

                    return rowsAffected > 0; // Retorna verdadeiro se pelo menos uma linha foi afetada
                }
            }
        }

        public async Task<bool> DeletarDepartamento(string codigo)
        {
            using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
            {
                string query = "DELETE FROM Departamentos WHERE Codigo = @Codigo";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Codigo", codigo);

                    await connection.OpenAsync(); // Abra a conexão de forma assíncrona
                    int rowsAffected = await command.ExecuteNonQueryAsync(); // Execute a consulta de forma assíncrona

                    return rowsAffected > 0; // Retorna verdadeiro se pelo menos uma linha foi afetada
                }
            }
        }
    }
}
