import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import { PORT } from './config.js'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
})

io.on('connection', (socket)=> {
    console.log(socket.id)

     socket.on('mensaje', (mensaje) =>{
     console.log(mensaje)
    socket.broadcast.emit('mensaje',{from:socket.id, body:mensaje}
    )
})
})

 app.use(express.static(join(__dirname, '../client/build')))

app.use(cors())
app.use(morgan("dev"))


server.listen(PORT)
console.log('server on port', PORT)