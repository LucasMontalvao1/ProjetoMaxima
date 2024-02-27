using Microsoft.AspNetCore.Mvc;
using Mysqlx;
using ProjetoMaxima.Models;
using ProjetoMaxima.Models.ViewModel;
using ProjetoMaxima.Services;

namespace ProjetoMaxima.Controllers
{
    public class ProdutosController : Controller
    {
        public readonly ProdutosService _produtosService;
        public readonly DepartamentoService _departamentoService;

        public ProdutosController(ProdutosService produtosService, DepartamentoService departamentoService)
        {
            _departamentoService = departamentoService;
            _produtosService = produtosService;
        }

        // Index de produtos
        public IActionResult Index()
        {
            try
            {
                var ListaProdutos = _produtosService.GetAllProdutos();
                return View(ListaProdutos);
            }
            catch (Exception ex)
            {
                return RedirectToAction(nameof(Error), new { message = ex.Message });
            }
        }

        // Criar novos produtos
        public async Task<IActionResult> CreateAsync()
        {
            try
            {
                var departamentos = await _departamentoService.GetAllDepartamentos();
                var viewModel = new ProdutosFormViewModel { Departaments = departamentos };
                return View(viewModel);
            }
            catch (Exception ex)
            {
                return RedirectToAction(nameof(Error), new { message = ex.Message });
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateAsync(Produto produto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var departamentos = await _departamentoService.GetAllDepartamentos();
                    var viewModel = new ProdutosFormViewModel { Departaments = departamentos, Produto = produto };
                    return View(viewModel);
                }

                _produtosService.InsertProduto(produto);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                return RedirectToAction(nameof(Error), new { message = ex.Message });
            }
        }


        public DepartamentoService Get_departamentoService()
        {
            return _departamentoService;
        }

        // Editar produto
        public async Task<IActionResult> EditAsync(int? id)
        {
            if (id == null)
            {
                return RedirectToAction(nameof(Error), new { message = "Id da requisiçao é nulo" });
            }

            var obj = _produtosService.FindById(id.Value); // Deve ser uma chamada assíncrona
            if (obj == null)
            {
                return RedirectToAction(nameof(Error), new { message = "Id da requisiçao nao existe" });
            }
            try
            {
                var departamentos = await _departamentoService.GetAllDepartamentos();
                var viewModel = new ProdutosFormViewModel { Produto = obj, Departaments = departamentos };
                return View(viewModel);
            }
            catch (Exception ex)
            {
                return RedirectToAction(nameof(Error), new { message = ex.Message });
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Produto produto)
        {
            if (id != produto.ID)
            {
                return RedirectToAction(nameof(Error), new { message = "Id não correspondem" });
            }

            try
            {
                if (!ModelState.IsValid)
                {
                    var departamentos = await _departamentoService.GetAllDepartamentos();
                    var viewModel = new ProdutosFormViewModel { Departaments = departamentos, Produto = produto };
                    return View(viewModel);
                }

                _produtosService.UpdateProduto(produto); // Deve ser uma chamada assíncrona para atualização
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                return RedirectToAction(nameof(Error), new { message = ex.Message });
            }
        }



        // detalhes dos produtos
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return RedirectToAction(nameof(Error), new { message = "Id da requisição é nulo" });
            }

            var obj = _produtosService.FindById(id.Value);

            if (obj == null)
            {
                return RedirectToAction(nameof(Error), new { message = "Id não existe" });
            }

            return View(obj);
        }

        public IActionResult Delete(int? id)
        {
            if (id == null)
            {
                return RedirectToAction(nameof(Error), new { message = "Id da requisição é nulo" });
            }

            var obj = _produtosService.FindById(id.Value);
            return View(obj);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id)
        {
            try
            {
                _produtosService.RemoveProduto(id);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception e)
            {
                return RedirectToAction(nameof(Error), new { message = e.Message });
            }
        }
    }
}

