import React, { useMemo, useState, useEffect } from 'react'

import DataTable from 'react-data-table-component';
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { FiX } from "react-icons/fi"

import Dialog from "../../Dialog"
import { BrCurrency } from '../../../utils'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { FiCalendar, FiAlertCircle } from 'react-icons/fi'

export default function HistoricoComprasTable({ pedidos, HandlerCancelamento }) {

  dayjs.extend(utc)
  dayjs.extend(customParseFormat)

  const [pedidosHistorico, setPedidosHistorico] = useState([]);
  const [cancelamento, setCancelmanto] = useState({});
  const [show, setShow] = useState(false);

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("");
  const [moedasTitle, setMoedasTitle] = useState("");

  useEffect(() => {
    setPedidosHistorico(pedidos)
  }, [pedidos])

  const paginationComponentOptions = {
    rowsPerPageText: 'Itens por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: false,
  };

  const data = useMemo(
    () => pedidosHistorico,
    [pedidosHistorico]
  )

  const columns = useMemo(
    () => [
      {
        name: 'Moedas',
        selector: row => row.moedas,
        sortable: true,
        minWidth: '330px'
      },
      {
        name: 'Valor de Compra',
        selector: row => row?.valorTotalCompra.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        sortable: true,
        sortFunction: (rowOne, rowTwo) => {
          if (rowOne.valorTotalCompra > rowTwo.valorTotalCompra) { return 1; }
          if (rowTwo.valorTotalCompra > rowOne.valorTotalCompra) { return -1; }
        }
      },
      {
        name: 'Valor de Venda',
        selector: row => row?.valorTotalVenda.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        sortable: true,
        sortFunction: (rowOne, rowTwo) => {
          if (rowOne.valorTotalVenda > rowTwo.valorTotalVenda) { return 1; }
          if (rowTwo.valorTotalVenda > rowOne.valorTotalVenda) { return -1; }
        }
      },
      {
        name: 'Data de Compra',
        selector: row => row?.dataCompra.includes("T") ? dayjs(row?.dataCompra).format("DD/MM/YY HH:mm") : row?.dataCompra,
        sortable: true,
        sortFunction: (rowOne, rowTwo) => {
          return new Date(rowOne.dataCompra).getTime() - new Date(rowTwo.dataCompra).getTime()
        }
      },
      {
        name: 'Data de Venda',
        selector: row => row?.dataVenda.includes("T") ? dayjs(row?.dataVenda).format("DD/MM/YY HH:mm") : row?.dataVenda,
        sortable: true,
        sortFunction: (rowOne, rowTwo) => {
          return new Date(rowOne.dataCompra).getTime() - new Date(rowTwo.dataCompra).getTime()
        }
      },
      {
        name: 'Status',
        selector: row => row.status == "aberto" ?
          <><span className='open'>{row.status.toLocaleUpperCase()}</span> <button className='btn btn-danger cancel' onClick={() => {
            setCancelmanto(row)
            setShow(!show)
          }}><FiX size={18} className='mb-1' /></button></> : row.status == "liquidado" ?
            <span className='cancelado'>{row.status.toLocaleUpperCase()}</span> :
            <span className='close'>{row.status.toLocaleUpperCase()}</span>,
        sortable: true,
        sortFunction: (rowOne, rowTwo) => {
          if (rowOne.status > rowTwo.status) { return 1; }
          if (rowTwo.status > rowOne.status) { return -1; }
        }
      },
    ],
    []
  )

  const filtrarTitulos = (pedidos, titulos) => {

    if (titulos === "" || pedidos.length <= 0)
      return pedidos;

    let titulosSolicitados = titulos.toLocaleLowerCase().split(",")
    let titulosHistorico = "";

    let filtradosTitle = pedidos.filter((item) => {
      titulosHistorico = item.moedas.toLocaleLowerCase()
      console.log(titulosHistorico)
      for (var i of titulosSolicitados) {
        console.log(i)
          if (titulosHistorico.includes(i.trim()))
            return true;
      }
      return false;
    })

    return filtradosTitle || [];
  }

  const filtrarStatus = (pedidos, status) => {
    if (status === "" || pedidos.length <= 0)
      return pedidos

    let pedidosFiltrados = pedidos.filter((item) => item.status === status)
    return pedidosFiltrados || [];
  }

  const filtrarDataIncial = (pedidos, datainicio) => {
    if (datainicio === "" || pedidos.length <= 0)
      return pedidos

    console.log(datainicio, "datainicio")
    let dataComp = null;
    let data = datainicio != "" ? dayjs(datainicio) : ""

    let pedidosFiltradosInicio = pedidos.filter((item) => {
      dataComp = dayjs(item.dataCompra)
      if (datainicio != "") {
        if (dataComp.unix() >= data.unix()) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    })

    return pedidosFiltradosInicio || []
  }

  const filtrarDataFim = (pedidos, datafim) => {
    if (datafim === "" || pedidos.length <= 0)
      return pedidos

    let dataComp = null;
    let data = datafim != "" ? dayjs(datafim).add(1, 'day') : ""

    let pedidosFiltradosInicio = pedidos.filter((item) => {
      dataComp = dayjs.utc(item.dataCompra)

      if (datafim != "") {
        if (dataComp.unix() <= data.unix()) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    })

    return pedidosFiltradosInicio || []
  }

  const onSubmitHandler = () => {
    let ft = filtrarTitulos(pedidos, moedasTitle)
    let fs = filtrarStatus(ft, status)
    let fdi = filtrarDataIncial(fs, dataInicio)
    let fdf = filtrarDataFim(fdi, dataFim)

    setPedidosHistorico(fdf);
  }

  const Message = () => <div>
    Tem certeza que deseja cancelar a operação N°: <strong>{cancelamento.id}</strong>
    &nbsp;no valor de <strong>{BrCurrency(cancelamento.valorTotalCompra)}</strong>?
  </div>

  return (
    <>

      {
        pedidos.length ?
          <>
            <Dialog show={show}
              setShow={setShow}
              message={<Message />}
              title={"Deseja Cancelar o Pedido?"}
              yesText={"Confirmar"}
              handleYes={() => {
                setShow(!show)
                HandlerCancelamento(cancelamento)
              }}
              noText={"Cancelar"}
              handleNot={() => setShow(!show)}
            />
            <div className='col-12'>
              <div className='m-3'>
                <div className='row'>
                  <Form.Group className="mb-3 col-lg-3" controlId="pesquisa">
                    <Form.Label>Pesquisa por Moedas:</Form.Label>
                    <Form.Control type="text" value={moedasTitle} onChange={e => setMoedasTitle(e.target.value)} placeholder="Separe os nomes por virgula" />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-3" controlId="status">
                    <Form.Label>Status:</Form.Label>
                    <Form.Select type="text" name='status' value={status} onChange={e => setStatus(e.target.value)}>
                      <option value="">Selecione um Status</option>
                      <option value="aberto">Aberto</option>
                      <option value="fechado">Fechado</option>
                      <option value="cancelado">Cancelado</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-2" controlId="dataInicio">
                    <Form.Label>Data de Compra - Inicial:</Form.Label>
                    <div className='date-icon'>
                      <Form.Control type="date" value={dataInicio} max={dataFim} onChange={(e) => setDataInicio(e.target.value)} placeholder="dataInicio" /><FiCalendar />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-2" controlId="dataFim">
                    <Form.Label>Data de Compra - Fim:</Form.Label>
                    <div className='date-icon'>
                      <Form.Control type="date" value={dataFim} min={dataInicio} onChange={(e) => setDataFim(e.target.value)} placeholder="dataFim" /><FiCalendar />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-2 form-group-bt" controlId="formBasicPassword">
                    <Button variant="primary" type="buttom" onClick={onSubmitHandler}>
                      Pesquisar
                    </Button>
                  </Form.Group>
                </div>
              </div>
            </div>
            {pedidosHistorico.length ?
              <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationComponentOptions}
              /> :
              <div className="text-center no-history">
                <FiAlertCircle />
                <h3>Pedidos não encontrados</h3>
              </div>
            }
          </> : null}
    </>
  );
}
