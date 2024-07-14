using Microsoft.AspNetCore.Mvc;
using ProjetoMaxima.Models;
using ProjetoMaxima.Services;
using System.Threading.Tasks;


namespace ProjetoMaxima.Controllers
{
    public class DepartamentosController : Controller
    {
        private readonly ProdutosService _produtosService;
        private readonly DepartamentoService _departamentoService;

        public DepartamentosController(ProdutosService produtosService, DepartamentoService departamentoService)
        {
            _departamentoService = departamentoService;
            _produtosService = produtosService;
        }

        public async Task<IActionResult> Index()
        {
            var listaDepartamentos = await _departamentoService.GetAllDepartamentos();
            return View(listaDepartamentos);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Departamento departamento)
        {
            if (ModelState.IsValid)
            {
                await _departamentoService.CadastrarDepartamento(departamento);
                return RedirectToAction(nameof(Index));
            }
            return View(departamento);
        }

        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var departamento = await _departamentoService.GetDepartamentoById(id);
            if (departamento == null)
            {
                return NotFound();
            }
            return View(departamento);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, Departamento departamento)
        {
            if (id != departamento.Codigo)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                await _departamentoService.EditarDepartamento(departamento);
                return RedirectToAction(nameof(Index));
            }
            return View(departamento);
        }

        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var departamento = await _departamentoService.GetDepartamentoById(id);
            if (departamento == null)
            {
                return NotFound();
            }
            return View(departamento);
        }

        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var departamento = await _departamentoService.GetDepartamentoById(id);
            if (departamento == null)
            {
                return NotFound();
            }

            return View(departamento);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            await _departamentoService.DeletarDepartamento(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
