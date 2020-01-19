const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const socket = require('socket.io')

const { PORT, HOST } = require('./config')
require('../db').connection;
const {authRoutes, routes} = require('../routers')

const app = express()

app.use(cors())
app.use(cors({origin: 'https://smartchat0018.herokuapp.com' }))
// app.options('*',cors())

const server = app.listen(process.env.PORT || PORT,(err)=>{
    if(err) console.log(err)
    else console.log(`Running on ${HOST}:${PORT}`)
}) 

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api',routes())
app.use('/api/auth',authRoutes())

const io = socket(server)
const { showUserController,chatController } = require('../controllers')

let connectedUsers = []

io.on('connection',(socket)=>{
    socket.on('CONNECT_USERS',async function(user,username){
        connectedUsers.push(user)
        await showUserController.makeUserOnline(username)
        var data = await showUserController.showAllActiveUsers(username)
        io.emit("CONNECTED_USERS",data)
    })

    socket.on('disconnect',async ()=>{
        for(var i=0;i<connectedUsers.length;i++){
            if(connectedUsers[i].socketID === socket.id){
                await showUserController.makeUserOffine(connectedUsers[i].name)
                var data = await showUserController.showAllActiveUsers(connectedUsers[i].name)
                io.emit("CONNECTED_USERS",data)
                connectedUsers.splice(i,1)  
                break
            }
        }
    })

    socket.on('JOIN_ROOM',async (roomID,sender,receiver)=>{
        socket.join(roomID)
        let roomMessages = await chatController.getParticularRoomMessages(roomID,sender,receiver)
        var data = await showUserController.showAllActiveUsers(sender)
        io.to(roomID).emit("CONNECTED_USERS",data)
        io.to(roomID).emit('SHOW_USER_MESSAGES',roomMessages,receiver)
    })

    socket.on('SEND_MESSAGE',async (message)=>{
        let newMessage = await chatController.saveNewMessage(message)
        let allMessages = await chatController.getRoomMessages(message.room)
        io.to(message.room).emit('RECEIVE_MESSAGE',allMessages,newMessage.receiver)
    })

    socket.on('UPDATE_NEW_MESSAGE',async (sender)=>{
        var data = await showUserController.showAllActiveUsers(sender)
        io.emit("CONNECTED_USERS",data)
    })
})


