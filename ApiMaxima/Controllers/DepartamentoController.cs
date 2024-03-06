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
            var ListaDepartamentos = _departamentoService.ObterTodosDepartamentos();
            return Ok(ListaDepartamentos);
        }

        [HttpGet("{codigo}")]
        [ProducesResponseType(200, Type = typeof(List<Departamento>))]
        public IActionResult GetByCodigo(string codigo)
        {
            var departamento = _departamentoService.ObterDepartamentoPorCodigo(codigo);
            if (departamento == null)
            {
                return NotFound();
            }
            return Ok(departamento);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Departamento))]
        [ProducesResponseType(400)]
        public IActionResult Post(Departamento departamento)
        {
            _departamentoService.CadastrarDepartamento(departamento);
            return CreatedAtAction(nameof(Get), new { id = departamento.Codigo }, departamento);
        }

        [HttpPut("{codigo}")]
        public async Task<IActionResult> Put(string codigo, Departamento departamento)
        {
            if (codigo != departamento.Codigo)
            {
                return BadRequest();
            }

            var sucesso = await _departamentoService.EditarDepartamento(departamento);
            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{codigo}")]
        public async Task<IActionResult> Delete(string codigo)
        {
            var sucesso = await _departamentoService.DeletarDepartamento(codigo);
            if (!sucesso)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            var sucesso = await _departamentoService.DeletarTodosDepartamentos();
            if (!sucesso)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
