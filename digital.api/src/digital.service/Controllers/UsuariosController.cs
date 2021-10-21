using digital.data.DbContext;
using digital.domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UsuariosController : ControllerBase
    {
        private readonly MongoDbContext _dbContext;
        private readonly UserManager<Usuarios> _userManager;

        public UsuariosController(UserManager<Usuarios> userManager, MongoDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var user = new Usuarios("Broza", "fnd_broz@gmail.com", "41764677897");

            var result = await _userManager.CreateAsync(user, "Brozinga");

            if(result.Succeeded)
            {
                return Ok(result);

            } else
            {
                return BadRequest();
            }
        }

        [HttpGet("/{Id}")]
        public async Task<IActionResult> Index(string Id)
        {        //"6170ed4dac561a66668ad2db"
            var result = await _dbContext.Usuarios.Find(x => x.Id == ObjectId.Parse(Id)).FirstOrDefaultAsync();
            var obj = result.Id;
            var objSt = result.Id.ToString();

            if (!string.IsNullOrEmpty(objSt))
            {
                return Ok(objSt);

            }
            else
            {
                return BadRequest();
            }
        }
    }
}
