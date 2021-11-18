using AspNetCore.Identity.Mongo.Mongo;
using digital.business.Handlers;
using digital.data.DbContext;
using digital.domain.InputViewModel;
using digital.domain.Models;
using digital.service.Middlewares;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly MongoDbContext _dbContext;
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<Papel> _papeisManager;
        private readonly TokenService _tokenService;
        private readonly UsuarioHandler _userHandler;

        public UsuariosController(UserManager<Usuario> userManager, MongoDbContext dbContext,
            RoleManager<Papel> papeisManager, TokenService tokenService, UsuarioHandler userHandler)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _papeisManager = papeisManager;
            _tokenService = tokenService;
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


        [HttpPost("/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginInputView userLogin) {

            var userResult = await _dbContext.Usuarios.FirstOrDefaultAsync(x=> x.Email == userLogin.user); 

            if(userResult == null)
                return NotFound();

            var pass = await _userManager.CheckPasswordAsync(userResult, userLogin.password);

            if (pass == false)
                return BadRequest();


            var token = _tokenService.GenerateToken(userResult);
            userResult.PasswordHash = "";

            return Ok(new
            {
                user = userResult,
                token = token
            });
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult Get()
        {

            return Ok("Hy");
        }

    }
}
