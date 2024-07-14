using Microsoft.AspNetCore.Mvc;
using ApiMaxima.Models;
using ApiMaxima.Services;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ApiMaxima.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartamentoController : ControllerBase
    {
        private readonly DepartamentoService _departamentoService;

        public DepartamentoController(DepartamentoService departamentoService)
        {
            _departamentoService = departamentoService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Departamento>))]
        public IActionResult Get()
        {
            var departamentos = _departamentoService.ObterTodosDepartamentos();
            return Ok(departamentos);
        }

        [HttpGet("{codigo}")]
        [ProducesResponseType(200, Type = typeof(Departamento))]
        [ProducesResponseType(404)]
        public IActionResult GetByCodigo(string codigo)
        {
            var departamento = _departamentoService.ObterDepartamentoPorCodigo(codigo);
            if (departamento == null)
            {
                return NotFound("Departamento não encontrado.");
            }
            return Ok(departamento);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Departamento))]
        [ProducesResponseType(400)]
        public IActionResult Post(Departamento departamento)
        {
            _departamentoService.CadastrarDepartamento(departamento);

            if (departamento == null)
            {
                return BadRequest("Dados inválidos para o departamento.");
            }

            return CreatedAtAction(nameof(GetByCodigo), new { codigo = departamento.Codigo }, departamento);
        }

        [HttpPut("{codigo}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Put(string codigo, Departamento departamento)
        {
            if (codigo != departamento.Codigo)
            {
                return BadRequest("Código do departamento no corpo da requisição não corresponde ao código da URL.");
            }

            var sucesso = await _departamentoService.EditarDepartamento(departamento);
            if (!sucesso)
            {
                return NotFound("Departamento não encontrado.");
            }

            return NoContent();
        }

        [HttpDelete("{codigo}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404, Type = typeof(string))]
        public async Task<IActionResult> Delete(string codigo)
        {
            try
            {
                var sucesso = await _departamentoService.DeletarDepartamento(codigo);
                if (!sucesso)
                {
                    return NotFound("Departamento não encontrado.");
                }

                return NoContent(); 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao deletar departamento: {ex.Message}");
                return StatusCode(500, "Erro interno ao deletar departamento.");
            }
        }


        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteAll()
        {
            var sucesso = await _departamentoService.DeletarTodosDepartamentos();
            if (!sucesso)
            {
                return NotFound("Não foi possível deletar todos os departamentos.");
            }

            return NoContent();
        }
    }
}
