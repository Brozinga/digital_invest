import React, { useMemo, useState } from 'react'

import DataTable from 'react-data-table-component';
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { FiX } from "react-icons/fi"

import Dialog from "../../Dialog"
import { BrCurrency } from '../../../utils'


export default function HistoricoComprasTable({ pedidos, HandlerCancelamento }) {

  dayjs.extend(utc)
  dayjs.extend(customParseFormat)

  const [cancelamento, setCancelmanto] = useState({});
  const [show, setShow] = useState(false);

  
const paginationComponentOptions = {
  rowsPerPageText: 'Itens por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: false,
};

  const data = useMemo(
    () => pedidos,
    [pedidos]
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
        selector: row =>  row?.valorTotalCompra.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        sortable: true,
        sortFunction: (rowOne, rowTwo) => {
          if (rowOne.valorTotalCompra > rowTwo.valorTotalCompra) { return 1; }
          if (rowTwo.valorTotalCompra > rowOne.valorTotalCompra) { return -1; }
        }
      },
      {
        name: 'Valor de Venda',
        selector: row =>  row?.valorTotalVenda.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
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
        }}><FiX size={18} className='mb-1'/></button></> : row.status == "cancelado" ?
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


  const Message = () => <div>
    Tem certeza que deseja cancelar a operação N°: <strong>{cancelamento.id}</strong>
    &nbsp;no valor de <strong>{BrCurrency(cancelamento.valorTotalCompra)}</strong>?
  </div>

  return (
    <>

      {
        pedidos ?
          <>
          <Dialog show={show}
                  setShow={setShow}
                  message={<Message/>}
                  title={"Deseja Cancelar o Pedido?"}
                  yesText={"Confirmar"}
                  handleYes={() => {
                    setShow(!show)
                    HandlerCancelamento(cancelamento)
                  }}
                  noText={"Cancelar"}
                  handleNot={() => setShow(!show)}
                  />
              <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationComponentOptions}
            />
          </> : null}
    </>
  );
}
