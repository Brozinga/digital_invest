export const BrCurrency = (valor) => {
    return parseFloat(valor).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
     })
}