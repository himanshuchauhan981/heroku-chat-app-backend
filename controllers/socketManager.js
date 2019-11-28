const socket = require('socket.io')
const server = require('../config').server
const io = socket(server)

let connectedUsers = []

// module.exports.SocketManager = socket =>{
//     socket.on('CONNECT_USERS',(user)=>{
//         connectedUsers.push(user)
//         io.emit("CONNECTED_USERS",connectedUsers)
//     })
// }

module.exports.SocketManager = ()=>{
    console.log('socketmanager')
    io.on('connection',function(socket){
        socket.on('CONNECT_USERS',function(user){
            connectedUsers.push(user)
            console.log(connectedUsers)
            io.emit("CONNECTED_USERS",connectedUsers)
        })
    })
}
