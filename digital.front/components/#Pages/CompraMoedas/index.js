import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import DatePicker, { registerLocale } from "react-datepicker"

import { addHours } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

import { FiPlus, FiTrash2 } from "react-icons/fi"
import { BrCurrency } from '../../../utils';

export default function ComprasMoedas({ dados }) {

    registerLocale("ptBR", ptBR)

    let dateNow = new Date();
    dateNow.setMinutes(0)
    dateNow.setSeconds(0)

    const hadleDate = (date) => {
        setStartDate(date)
    }

    useEffect(() => {
    }, [dados])

    const [moedasSelectBox, setMoedasSelectBox] = useState([])
    const [items, setItems] = useState([])
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(addHours(dateNow, 2));
    const [dadoFiltrado, setDadoFiltrado] = useState({})
    const [quantidade, setQuantidade] = useState(1)
    const [valor, setValor] = useState(0.00)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const filterPassedTime = (time) => {
        const currentDate = addHours(new Date(), 1);
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const handleMoeda = (data) => {
        data.selecionado = true;
        setMoedasSelectBox([...moedasSelectBox.filter(i => i.id != data.id), data])
    }

    const handleAddCardCompra = () => {
        setItems([
            ...items,
            {
                id: dadoFiltrado.id,
                nomeMoeda: dadoFiltrado.nome,
                quantidade: quantidade,
                valor: (dadoFiltrado.cotacoes[dadoFiltrado.cotacoes.length - 1].valorCotado * quantidade)
            }
        ])
    }

    const handleExclude = (id) => {
        setItems([
            ...items.filter(it => it.id != id)
        ])
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-3'>
                    <Button onClick={handleShow}>Comprar Moedas</Button>
                </div>
            </div>

            <Modal size="lg" show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Compra de Moedas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-md-12'>
                        <div className=' d-flex justify-content-between container-fluid'>
                            <Form.Group className="mb-3 mt-4 col-lg-4 col-md-4" controlId="add">
                                <Button onClick={handleAddCardCompra} variant="success">Adicionar <FiPlus size={18} className='mb-1 mt-1' /></Button>
                            </Form.Group>
                            <Form.Group className="text-center mb-3 mt-1 col-lg-4 col-md-6">
                                <Form.Label htmlFor="disabledSelect">Data para Venda</Form.Label>
                                <DatePicker
                                    className='form-control'
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    timeCaption="Hora"
                                    closeOnScroll={true}
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    filterTime={filterPassedTime}
                                    minDate={new Date()}
                                    locale="ptBR"
                                    selected={startDate}
                                    onChange={hadleDate} />
                            </Form.Group>
                        </div>
                        <CardCompraMoeda
                            selectedItems={items}
                            setValor={setValor}
                            valor={valor}
                            quantidade={quantidade}
                            setQuantidade={setQuantidade}
                            dadoFiltrado={dadoFiltrado}
                            setDadoFiltrado={setDadoFiltrado}
                            hadlerMoedaSelect={handleMoeda}
                            dados={dados} />
                        <br />
                        {
                            items.map(i => <PreSelecao key={i.id} handleExclude={handleExclude} dados={i} />)
                        }
                    </div>

                    <div className='mb-2 d-flex container-fluid justify-content-between align-content-center'>
                        <div className='col-lg-3 col-md-5 col-sm-12'>
                            <Button variant="secondary" onClick={handleShow}>Finalizar Compra</Button>
                        </div>
                        <div className='col-sm-12 col-md-7 col-lg-5 mt-3 d-flex justify-content-md-end justify-content-sm-center'>
                            <h3><strong>R$ 00,00</strong></h3>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}




function CardCompraMoeda({ dados, setDadoFiltrado, dadoFiltrado, hadlerMoedaSelect,
    quantidade, setQuantidade, setValor, valor, selectedItems
}) {

    useEffect(() => {
        setDadoFiltrado(dados.find(i => i.id == dadoFiltrado?.id))
    }, [dados])

    useEffect(() => {
        if (dadoFiltrado)
            setValor((pegarUltimaCotacao(dadoFiltrado)?.valorCotado || 0) * quantidade)

    }, [dadoFiltrado])

    const handleQuantidade = (e) => {
        if (e.target.value <= 0 || e.target.value == "") {
            setQuantidade(1)
            setValor(pegarUltimaCotacao(dadoFiltrado)?.valorCotado * 1)
        } else {
            setQuantidade(e.target.value)
            setValor(pegarUltimaCotacao(dadoFiltrado)?.valorCotado * e.target.value)
        }
    }

    const handleSelect = dado => {
        setDadoFiltrado(dado)
        setQuantidade(1)
        setValor(pegarUltimaCotacao(dado)?.valorCotado)
    }

    const pegarUltimaCotacao = (dado) => {
        if (dado?.cotacoes)
            return dado?.cotacoes[dado.cotacoes?.length - 1 || 0]

        return null
    }

    return (
        <>
            <div className='row inputs mb-2'>
                <SelectMoeda selectedItems={selectedItems} dados={dados} handlerSelectMoeda={handleSelect} />
                <Form.Group className="text-center mb-3 col-lg-3 col-md-6" controlId="quantidade">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control type="number" onChange={handleQuantidade} value={quantidade} min="1" placeholder="Quantidade" />
                </Form.Group>
                <Form.Group className="text-center mb-3 col-lg-4 col-md-6" controlId="valor">
                    <Form.Label>Valor</Form.Label>
                    <Form.Text className="card-compra-moeda d-block mt-1 form-control-lg">
                        {BrCurrency(valor)}
                    </Form.Text>
                </Form.Group>
            </div>
        </>
    )
}

function SelectMoeda({ dados, selectedItems, handlerSelectMoeda }) {

    const [items, setItems] = useState([])

    useEffect(() => {

        setItems(dados.filter(item => {
            let val = selectedItems.filter(a => a.id == item.id)
            if (val.length <= 0) {
                return item
            }
        }))
    }, [selectedItems])

    const handlerCh = (e) => {
        console.log(e)
        handlerSelectMoeda(items.find(i => i.id == e.target.value))
    }

    return (
        <Form.Group className="text-center mb-3 col-lg-5 col-md-6">
            <Form.Label htmlFor="disabledSelect">Selecione a Moeda</Form.Label>
            <Form.Select defaultValue={""} onChange={handlerCh} className='form-control' id="moedas">
                <option value="" disabled>Selecione</option>
                {
                    items.length > 0 ?
                        items.map((value, index) =>
                            <option key={value.id} value={value.id}>{value.nome}</option>
                        ) : null
                }
            </Form.Select>
        </Form.Group>
    )
}

function PreSelecao({ dados, handleExclude }) {

    const handleExcludeLocal = (id) => {
        handleExclude(id)
    }

    return (
        <>
            <div className='row inputs mb-2 inputs-prontos'>
                <input type="hidden" value={dados.id} />
                <Form.Group className="text-center mb-3 col-lg-4 col-md-6" controlId="quantidade">
                    <Form.Label>Moeda</Form.Label>
                    <Form.Control type="text" disabled value={dados.nomeMoeda} />
                </Form.Group>
                <Form.Group className="text-center mb-3 col-lg-3 col-md-6" controlId="quantidade">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control type="number" disabled value={dados.quantidade} />
                </Form.Group>
                <Form.Group className="text-center mb-3 col-lg-4 col-md-6" controlId="valor">
                    <Form.Label>Valor</Form.Label>
                    <Form.Text className="d-block mt-1 form-control-lg valor-pronto">
                        {BrCurrency(dados.valor)}
                    </Form.Text>
                </Form.Group>
                <div className='mt-3 col-lg-1 col-md-2 col-sm-12'>
                    <Button variant="danger" onClick={() => handleExcludeLocal(dados.id)}><FiTrash2 /></Button>
                </div>
            </div>
        </>
    )
}