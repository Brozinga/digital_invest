using digital.business.Handlers;
using digital.domain.InputViewModel;
using digital.domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly RoleManager<Papel> _papeisManager;
        private readonly UsuarioHandler _userHandler;

        public UsuariosController(RoleManager<Papel> papeisManager, UsuarioHandler userHandler)
        {
            _papeisManager = papeisManager;
            _userHandler = userHandler;
        }

        [HttpGet("[action]/{name}")]
        [AllowAnonymous]
        public async Task<IActionResult> CriarPapel([FromRoute] string name)
        {
            var result = await _papeisManager.CreateAsync(new Papel { Name = name.ToLower(), NormalizedName = name.ToUpper() });

            if(result.Succeeded)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] NewUsuarioInput usuario)
        {
            var result = await _userHandler.Execute(usuario);
            return StatusCode((int) result.Status, result);
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordInputView passChange)
        {
            var result = await _userHandler.Execute(passChange);
            return StatusCode((int)result.Status, result);
        }


        [HttpPost("/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginInputView userLogin) {

            var result = await _userHandler.Execute(userLogin);
            return StatusCode((int)result.Status, result);
        }
    }
}
