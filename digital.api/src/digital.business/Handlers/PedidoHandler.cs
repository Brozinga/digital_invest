﻿using digital.assets.Texts;
using digital.business.Interfaces;
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
        public PedidoHandler(IUnitOfWork uow, IHostEnvironment env) : base(uow, env)
        {

        }

        public async Task<BasicResponse> Executar(NovoPedidoInputView data)
        {
            try
            {
                data.Validate();
                if (!data.IsValid)
                    return BasicResponse.BadRequest(null, data.Notifications);

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

                var usuarioId = data.UsuarioClaims.FirstOrDefault(x => x.Type == ClaimTypes.Sid).Value;

                if (string.IsNullOrEmpty(usuarioId))
                    return this.InternalServerError(new Exception(ErrorText.UsuarioNaoExiste));

                var usuario = await _uow.UsuarioRepository.PegarUsuarioId(ObjectId.Parse(usuarioId));

                if (usuario == null)
                    return this.InternalServerError(new Exception(ErrorText.UsuarioNaoExiste));

                if (data.ValorTotalCompra > usuario.Carteira)
                    return BasicResponse.BadRequest(ErrorText.NovoPedidoMaiorCarteira);

                usuario.Carteira -= data.ValorTotalCompra;

                _uow.PedidoRepository.CriarPedido(new Pedido
                {
                    DataVenda = data.DataVenda,
                    IdUsuario = usuario.Id,
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