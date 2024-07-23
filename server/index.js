import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import {createServer} from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket)=> {
    console.log('a user has conected')

    socket.on('disconnect', ()=> {
        console.log('a user has disconnect')
    })
})
app.use(logger('dev'))

app.get('/', (rez, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})


server.listen(port,() => {
    console.log(`Escuchando en el puerto http://localhost:${port}`)
})