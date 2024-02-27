using Microsoft.Extensions.Options;
using ProjetoMaxima.Models;
using ProjetoMaxima.Services.Data;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace ProjetoMaxima.Services
{
    public class DepartamentoService
    {
        private readonly HttpClient _httpClient;

        public DepartamentoService(HttpClient httpClient, IOptions<ApiConfig> apiConfig)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(apiConfig.Value.BaseUrl);
        }

        public async Task<List<Departamento>> GetAllDepartamentos()
        {
            try
            {
                return await _httpClient.GetFromJsonAsync<List<Departamento>>("https://localhost:7041/Departamento");
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("Erro na requisição HTTP: " + ex.Message);
                return new List<Departamento>();
            }
        }

        public async Task CadastrarDepartamento(Departamento departamento)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync("https://localhost:7041/Departamento", departamento);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Falha ao cadastrar o departamento. Código de status: " + response.StatusCode);
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("Erro na requisição HTTP: " + ex.Message);
            }
        }

        public async Task<Departamento> GetDepartamentoById(string id)
        {
            try
            {
                return await _httpClient.GetFromJsonAsync<Departamento>($"https://localhost:7041/Departamento/{id}");
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("Erro na requisição HTTP: " + ex.Message);
                return null;
            }
        }

        public async Task EditarDepartamento(Departamento departamento)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.PutAsJsonAsync($"https://localhost:7041/Departamento/{departamento.Codigo}", departamento);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Falha ao editar o departamento. Código de status: " + response.StatusCode);
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("Erro na requisição HTTP: " + ex.Message);
            }
        }

        public async Task DeletarDepartamento(string id)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.DeleteAsync($"https://localhost:7041/Departamento/{id}");

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Falha ao excluir o departamento. Código de status: " + response.StatusCode);
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("Erro na requisição HTTP: " + ex.Message);
            }
        }
    }
}
