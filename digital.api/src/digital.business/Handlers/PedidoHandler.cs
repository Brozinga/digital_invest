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
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using digital.domain.Enums;
using digital.domain.OutputViewModel;
using digital.util.Extensions;

namespace digital.business.Handlers
{
    public class PedidoHandler : GenericHandler, IHandlerBase<NovoPedidoInputView, BasicResponse>,
        IHandlerBase<PegarHistoricoComprasInputView, BasicResponse>,
        IHandlerBase<RemoverPedidoInputView, BasicResponse>

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
                data.ValorTotalCompra = 0.0f;

                foreach (var moedaComprada in data.MoedasCompra)
                {
                    var moedaCotacao = await _uow.CotacaoRepository
                        .PegarUltimaCotacaoPelaMoedaId(ObjectId.Parse(moedaComprada.MoedaId));

                    if (moedaCotacao == null)
                        throw new Exception(ErrorText.NovoPedidoMoedaNaoEncontrada);

                    moedasModel.Add(new MoedasCompraVenda
                    {
                        Id = ObjectId.GenerateNewId(),
                        DataCotacao = moedaCotacao.DataCotacao,
                        ValorCotado = moedaCotacao.ValorCotado,
                        MoedaId = moedaCotacao.MoedaId,
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

        public async Task<BasicResponse> Executar(PegarHistoricoComprasInputView data)
        {
            try
            {
                var usuarioId = _jwt.GetUserIdByToken(data.UsuarioClaims);

                if (string.IsNullOrEmpty(usuarioId))
                    return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);

                var pedidos =
                    await _uow.PedidoRepository.PegarPedidosPorUsuarioId(ObjectId.Parse(usuarioId),
                        data.QuantidadeRegistros);
                var qtdPedidos =
                    await _uow.PedidoRepository.PegarQuantidadeTotalPedidosPorUsuarioId(ObjectId.Parse(usuarioId));

                if (pedidos?.Count <= 0)
                    return BasicResponse.NotFound(ErrorText.PedidosNaoEncontrados);

                var moedas = await _uow.MoedasRepository.PegarTodasMoedas();
                HistoricoComprasOutputView item = null;
                List<HistoricoComprasOutputView> listaCompras = new List<HistoricoComprasOutputView>();
                var moedasCompradasId = new List<ObjectId>();
                IEnumerable<string> moedasNome = new List<string>();
                foreach (var pedido in pedidos)
                {
                    item = HistoricoComprasOutputView.Map(pedido);
                    moedasCompradasId = pedido.MoedasCompra.Select(x => x.MoedaId).ToList();
                    moedasNome = moedas
                        .Where(x => moedasCompradasId.Contains(x.Id))
                        .OrderBy(x => x.Nome)
                        .Select(x => x.Nome);
                    
                    item.Moedas = string.Join(",", moedasNome);

                    listaCompras.Add(item);
                }

                return BasicResponse.OK(null, new
                {
                    quantidade = qtdPedidos,
                    listaCompras
                });
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        public  async Task<BasicResponse> Executar(RemoverPedidoInputView data)
        {
            var usuarioId = _jwt.GetUserIdByToken(data.UsuarioClaims);

            if (string.IsNullOrEmpty(usuarioId))
                return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);
            
            var pedido = await _uow.PedidoRepository.PegarPedido(ObjectId.Parse(data.Id),ObjectId.Parse(usuarioId));

            if (pedido is null)
                return BasicResponse.NotFound(ErrorText.PedidoNaoEncontrado);
            
            if(pedido.Status != EStatusPedido.ABERTO.ToDescriptionString())
                return BasicResponse.BadRequest(ErrorText.CancelamentoSomenteStatusAberto);
            
            var usuario = await _uow.UsuarioRepository.PegarUsuarioId(ObjectId.Parse(usuarioId));
            
            if (usuario is null)
                return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);

            usuario.Carteira += pedido.ValorTotalCompra;

            var pedidoCancelado = await _uow.PedidoRepository.CancelarPedido(pedido);

            if (pedidoCancelado.ModifiedCount > 0)
            {
                await _uow.UsuarioRepository.AtualizarUsuario(usuario);
            }
            
            return BasicResponse.OK(SuccessText.PedidoCancelado);

        }
    }
}