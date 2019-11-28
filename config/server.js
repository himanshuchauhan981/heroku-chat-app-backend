
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const socket = require('socket.io')

// const { PORT, HOST } = require('./config')
require('../db').connection;
const {authRoutes, routes} = require('../routers')

const app = express()

const server = app.listen(process.env.PORT||'0.0.0.0',(err)=>{
    if(err) console.log(err)
    // else console.log(`Running on ${HOST}:${PORT}`)
}) 

app.use(cors())
app.options('*',cors())

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/',routes())
app.use('/auth',authRoutes())

const io = socket(server)
const { showUsers,chatController } = require('../controllers')

let connectedUsers = []

io.on('connection',(socket)=>{
    socket.on('CONNECT_USERS',async function(user,username){
        var data = await showUsers.showAllActiveUsers(username)
        await showUsers.makeUserOnline(username)
        io.emit("CONNECTED_USERS",data)
    })

    socket.on('disconnect',async ()=>{
        for(var i=0;i<connectedUsers.length;i++){
            if(connectedUsers[i].socketID === socket.id){
                showUsers.makeUserOffine(connectedUsers[i].name)
                var data = await showUsers.showAllActiveUsers(connectedUsers[i].name)
                io.emit("CONNECTED_USERS",data)
                connectedUsers.splice(i,1)  
                break
            }
        } 
    })

    socket.on('JOIN_ROOM',(roomID)=>{
        socket.join(roomID)
    })

    socket.on('SEND_MESSAGE',async (message)=>{
        await chatController.saveNewMessage(message)
        let allMessages = await chatController.getRoomMessages(message.room)
        io.emit('RECIEVE_MESSAGE',allMessages)
    })
})


