const express = require('express')
const handlebars = require('express-handlebars')
const homeRouter = require('./routes/home.routes')
const http = require('http')
const app = express()
const PORT = 8080 || process.env.PORT

let  arrMessage=[]

const {Server}=require('socket.io')
const { log } = require('console')
//Server htpp
const server = http.createServer(app)

//PUBLIC

app.use(express.static(__dirname + "/public"))

//ENGINE
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//ROUTE
app.use('/home', homeRouter)

//Socket Server
const io=new Server(server)
io.on('connection',(socket)=>{
    console.log('Hola mi nueva Charla');
    socket.emit('Wellcome', 'Cliente nuevo')

    socket.on('new-socio',(data)=>{
        arrMessage.push(data)
        //socket.emit('message-all',arrMessage)
        io.sockets.emit('message-all',arrMessage)

    })

})

server.listen(8080, () => {
    console.log("Server run on port" + PORT);
}) 