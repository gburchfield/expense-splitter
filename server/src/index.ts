import express from 'express'
import bodyParser from 'body-parser'
import * as http from 'http'
import logger from './utils/logger';
import {AddressInfo, ListenOptions} from 'net';
import {ServerOptions} from 'http2';
import {URL} from 'url';

const app = express()
app.use(bodyParser.json())

const distDir = __dirname + '/dist/'
app.use(express.static(distDir))

// Set server options and create http server
const serverOptions: ServerOptions = {}
// @ts-ignore
const server = http.createServer(serverOptions, app)

// Set server event listeners
server.on('listening',() => {
  const addressInfo = server.address()
  logger.log(`Server is listening: `, addressInfo)
})

server.on('error', (e: Error) => {
  logger.error(e)
})

server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
  const receivedRequest: URL = new URL(req.url as string, `http://${req.headers.host}`)
  logger.log(receivedRequest)
})

// Set listen options and start server
const listenOptions: ListenOptions = {
  port: parseInt(process.env.PORT as string, 10) || 3000,
  host: process.env.HOST || '127.0.0.1'
}
server.listen(listenOptions)

