using Microsoft.AspNetCore.Mvc;
using ApiMaxima.Models;
using ApiMaxima.Services;
using System.Threading.Tasks;

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
        public IActionResult Get()
        {
            var ListaDepartamentos = _departamentoService.ObterTodosDepartamentos();
            return Ok(ListaDepartamentos);
        }

        [HttpPost]
        public IActionResult Post(Departamento departamento)
        {
            _departamentoService.CadastrarDepartamento(departamento);
            return CreatedAtAction(nameof(Get), new { id = departamento.Codigo }, departamento);
        }
    }
}
