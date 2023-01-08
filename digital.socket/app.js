const WebSocket = require('ws');
const url = require('url');
const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
let CLIENTS = [];
let WSS = null;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

function broadcast(jsonObject) {
    if (!this.clients) return;
    this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObject));
        }
    });
}

const getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

function getClient(id) {
    return CLIENTS.filter(item => item.id === id)
}

function removeClient(uid) {
    CLIENTS = CLIENTS.filter((item) => item.uid != uid)
}

function getWebSocketServer() {
    return WSS;
}

function setWebSocketServer(wss) {
    WSS = wss;
}

function onError(ws, err) {
    console.error(`Erro: ${err.message}`);
}

function onMessage(ws, data) {
    let botMessage = JSON.parse(data)
    console.log(`Mensagem chegou para: ${botMessage.sendTo}`)
    if (botMessage?.sendTo) {
        let clientReceivMenssage = getClient(botMessage.sendTo)
        if (clientReceivMenssage.length) {
            for(let client of clientReceivMenssage) {
                client.send("refresh")
                console.log(`Mensagem enviada para: ${client.id} - UUID: ${client.uid}`)
            }
        }
    }

}

function onClose(ws, req) {
    removeClient(ws.uid)
    console.error(`cliente saiu: ${ws.id} UUID: ${ws.uid}`);
}

function onConnection(ws, req) {
    let { id } = url.parse(req.url, true).query;
    ws.id = id;
    ws.uid = getUniqueID();
    CLIENTS.push(ws)

    console.log(`cliente conectado: ${id} - UUID: ${ws.uid}`)
    ws.on('close', req => onClose(ws, req));
    ws.on('message', data => onMessage(ws, data, req));
    ws.on('error', error => onError(ws, error));
}

module.exports = {
    webSocket: (server) => {
        const wss = new WebSocket.Server({
            server
        });

        wss.on('connection', onConnection);
        wss.broadcast = broadcast;
        setWebSocketServer(wss);

        console.log(`Websocket rodando!`);
        return wss;
    },
    app
}