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
                return NotFound($"Produto com ID {id} não encontrado.");
            }
            return Ok(produto);
        }


        [HttpGet("codigo/{codigo}")]
        public IActionResult GetByCodigo(string codigo)
        {
            var produto = _produtoService.ObterProdutoPorCodigo(codigo);
            if (produto == null)
            {
                return NotFound($"Produto com código {codigo} não encontrado.");
            }
            return Ok(produto);
        }

        [HttpPost]
        public IActionResult Post(List<Produto> produtos)
        {
            if (produtos == null || produtos.Count == 0)
            {
                return BadRequest("A lista de produtos não pode ser nula ou vazia.");
            }

            foreach (var produto in produtos)
            {
                try
                {
                    _produtoService.CadastrarProduto(produto);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Erro ao cadastrar o produto: {ex.Message}");
                }
            }

            return CreatedAtAction(nameof(Get), produtos);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Produto produto)
        {
            if (id != produto.ID)
            {
                return BadRequest("O ID do produto não corresponde ao ID fornecido.");
            }

            try
            {
                _produtoService.AtualizarProduto(produto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao atualizar o produto: {ex.Message}");
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var produto = _produtoService.ObterProdutoPorId(id);
            if (produto == null)
            {
                return NotFound($"Produto com ID {id} não encontrado.");
            }

            try
            {
                _produtoService.DeletarProdutoPorId(id);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao deletar o produto: {ex.Message}");
            }

            return NoContent();
        }


        [HttpDelete("codigo/{codigo}")]
        public IActionResult DeleteByCodigo(string codigo)
        {
            var produto = _produtoService.ObterProdutoPorCodigo(codigo);
            if (produto == null)
            {
                return NotFound($"Produto com código {codigo} não encontrado.");
            }

            try
            {
                _produtoService.DeletarProdutoPorCodigo(codigo);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao deletar o produto: {ex.Message}");
            }

            return NoContent();
        }


        [HttpDelete]
        public IActionResult DeleteAll()
        {
            try
            {
                _produtoService.DeletarTodosProdutos();
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao deletar todos os produtos: {ex.Message}");
            }

            return NoContent();
        }

        [HttpPatch("inutilizar/{id}")]
        public IActionResult InutilizarProduto(int id)
        {
            try
            {
                bool sucesso = _produtoService.InutilizarProduto(id);
                if (sucesso)
                {
                    return Ok(new { });
                }
                else
                {
                    return NotFound($"Produto com ID {id} não encontrado.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao inutilizar produto: {ex.Message}");
            }
        }
    }

}

