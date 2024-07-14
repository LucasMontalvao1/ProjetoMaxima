using Microsoft.AspNetCore.Mvc;
using ApiMaxima.Models;
using ApiMaxima.Services;

namespace ApiMaxima.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;

        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var ListaProdutos = _produtoService.ObterTodosProdutos();
            return Ok(ListaProdutos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var produto = _produtoService.ObterProdutoPorId(id);
            if (produto == null)
            {
                return NotFound();
            }
            return Ok(produto);
        }

        [HttpGet("codigo/{codigo}")]
        public IActionResult GetByCodigo(string codigo)
        {
            var produto = _produtoService.ObterProdutoPorCodigo(codigo);
            if (produto == null)
            {
                return NotFound();
            }
            return Ok(produto);
        }

        [HttpPost]
        public IActionResult Post(List<Produto> produtos)
        {
            foreach (var produto in produtos)
            {
                _produtoService.CadastrarProduto(produto);
            }

            return CreatedAtAction(nameof(Get), produtos);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Produto produto)
        {
            if (id != produto.ID)
            {
                return BadRequest();
            }

            _produtoService.AtualizarProduto(produto);

            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var produto = _produtoService.ObterProdutoPorId(id);
            if (produto == null)
            {
                return NotFound();
            }

            _produtoService.DeletarProdutoPorId(id);

            return NoContent();
        }


        [HttpDelete("codigo/{codigo}")]
        public IActionResult DeleteByCodigo(string codigo)
        {
            var produto = _produtoService.ObterProdutoPorCodigo(codigo);
            if (produto == null)
            {
                return NotFound();
            }

            _produtoService.DeletarProdutoPorCodigo(codigo);

            return NoContent();
        }


        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _produtoService.DeletarTodosProdutos();
            return NoContent();
        }
    }
}
