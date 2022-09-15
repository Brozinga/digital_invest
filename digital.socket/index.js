require('./config')
const {webSocket, app} = require('./app');

const server = app.listen(process.env.WEB_SOCKET_PORT || 8080, () => {
    console.log(`Servidor web iniciado na porta ${process.env.WEB_SOCKET_PORT}`);
})

webSocket(server);
