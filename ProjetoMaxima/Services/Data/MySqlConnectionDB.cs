using System;
using MySql.Data.MySqlClient;

namespace ProjetoMaxima.Services
{
    public class MySqlConnectionDB
    {
        public MySqlConnection CreateConnection()
        {
            string connectionString = "server=localhost;userid=root;password=asd123;database=maxima";
            return new MySqlConnection(connectionString);
        }
    }
}
