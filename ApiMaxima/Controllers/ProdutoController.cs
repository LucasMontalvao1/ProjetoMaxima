using System.Collections.Generic;
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

        [HttpPost]
        public IActionResult Post(Produto produto)
        {
            _produtoService.CadastrarProduto(produto);
            return CreatedAtAction(nameof(Get), new { id = produto.ID }, produto);
        }
    }
}
