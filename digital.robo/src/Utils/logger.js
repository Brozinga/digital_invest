const winston = require('winston')
const { format } = require('date-fns')
const path = require("path")

const logger = filename => winston.createLogger({
    level: 'debug',
    format: winston.format.printf(info => `${format(new Date(), "yyyy-MM-dd hh:mm:ss")} | ${path.basename(filename)} => ${info.message}`),
    transports: new winston.transports.Console(),
});

module.exports = logger;