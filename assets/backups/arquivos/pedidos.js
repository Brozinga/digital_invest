db.getCollection("pedidos").insert( {
    __v: NumberInt("1"),
    _id: ObjectId("616349144794527e145c296f"),
    ativo: true,
    dataCompra: ISODate("2021-11-09T19:55:10.000Z"),
    dataVenda: ISODate("2021-10-10T04:00:00.000Z"),
    idUsuario: ObjectId("616345414794527e145c296e"),
    moedasCompra: [
        {
            _id: ObjectId("6161f39e5b316aab2dafb72f"),
            moedaId: ObjectId("6146e19eaa6d680a35e87b5e"),
            dataCotacao: ISODate("2021-11-09T19:55:10.000Z"),
            valorCotado: 7.39,
            quantidade: NumberInt("10")
        }
    ],
    moedasVenda: [
        {
            moedaId: ObjectId("6146e19eaa6d680a35e87b5e"),
            dataCotacao: ISODate("2021-10-11T06:05:00.000Z"),
            valorCotado: 7.02,
            quantidade: NumberInt("10"),
            _id: ObjectId("6163d7138316c50a6efef829")
        }
    ],
    status: "fechado",
    valorTotalCompra: 73.9,
    valorTotalVenda: 70.2
} );
