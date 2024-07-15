using ApiMaxima.Repository.Interface;
using ApiMaxima.Services;
using MySql.Data.MySqlClient;

namespace ApiMaxima.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly MySqlConnectionDB _mySqlConnectionDB;

        public AuthRepository(MySqlConnectionDB mySqlConnectionDB)
        {
            _mySqlConnectionDB = mySqlConnectionDB;
        }

        public bool ValidarUsuario(string username, string password)
        {
            bool isValid = false;

            using (MySqlConnection connection = _mySqlConnectionDB.CreateConnection())
            {
                string query = "SELECT COUNT(1) FROM Users WHERE Username = @Username AND Password = @Password";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Username", username);
                    command.Parameters.AddWithValue("@Password", password);

                    connection.Open();

                    int count = Convert.ToInt32(command.ExecuteScalar());

                    if (count > 0)
                    {
                        isValid = true;
                    }
                }
            }

            return isValid;
        }
    }
}
