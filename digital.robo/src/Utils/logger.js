const winston = require('winston')
const dayjs = require('dayjs')
const path = require("path")

const logger = filename => winston.createLogger({
    level: 'debug',
    format: winston.format.printf(info => `${dayjs().format("yyyy-MM-dd HH:mm:ss")} | ${path.basename(filename)} => ${info.message}`),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `${path.join(__dirname, "..", "..")}/robo.log`,
            level: 'info'
        })
    ],
});

module.exports = logger;