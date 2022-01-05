using digital.assets.Texts;
using digital.business.Interfaces;
using digital.business.Services;
using digital.data.Interfaces;
using digital.domain.InputViewModel;
using digital.domain.Models;
using digital.domain.Responses;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace digital.business.Handlers
{
    public class PedidoHandler : GenericHandler, IHandlerBase<NovoPedidoInputView, BasicResponse>
    {
        private readonly TokenService _jwt;

        public PedidoHandler(IUnitOfWork uow, IHostEnvironment env, TokenService jwt) : base(uow, env)
        {
            _jwt = jwt;
        }

        public async Task<BasicResponse> Executar(NovoPedidoInputView data)
        {
            try
            {
                data.Validate();
                if (!data.IsValid)
                    return BasicResponse.BadRequest(null, data.Notifications);

                var usuarioId = _jwt.GetUserIdByToken(data.UsuarioClaims);

                if (string.IsNullOrEmpty(usuarioId))
                    return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);

                var usuario = await _uow.UsuarioRepository.PegarUsuarioId(ObjectId.Parse(usuarioId));

                if (usuario == null)
                    return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);

                var moedasModel = new List<MoedasCompraVenda>();
                data.ValorTotalCompra = 0.0M;

                foreach (var moedaComprada in data.MoedasCompra)
                {
                    var moedaCotacao = await _uow.CotacaoRepository
                                                .PegarUltimaCotacaoPelaMoedaId(ObjectId.Parse(moedaComprada.MoedaId));

                    if (moedaCotacao == null)
                        throw new Exception(ErrorText.NovoPedidoMoedaNaoEncontrada);

                    moedasModel.Add(new MoedasCompraVenda
                    {
                        DataCotacao = moedaCotacao.DataCotacao,
                        ValorCotado = moedaCotacao.ValorCotado,
                        MoedaId = moedaCotacao.Id,
                        Quantidade = moedaComprada.Quantidade
                    });

                    data.ValorTotalCompra += (moedaCotacao.ValorCotado * moedaComprada.Quantidade);
                }

                if (data.ValorTotalCompra > usuario.Carteira)
                    return BasicResponse.BadRequest(ErrorText.NovoPedidoMaiorCarteira);

                usuario.Carteira -= data.ValorTotalCompra;

                _uow.PedidoRepository.CriarPedido(new Pedido
                {
                    DataVenda = data.DataVenda,
                    UsuarioId = usuario.Id,
                    MoedasCompra = moedasModel,
                    ValorTotalCompra = data.ValorTotalCompra
                });

                 await _uow.UsuarioRepository.AtualizarUsuario(usuario);

                return BasicResponse.OK(SuccessText.PedidoCriado);

            }
            catch (Exception ex)
            {
               return this.InternalServerError(ex);
            }
        }
    }
}
