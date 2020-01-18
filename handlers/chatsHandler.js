const { userChat } = require('../models')

let setReadMessagesStatus = async (room,sender,receiver)=>{
    await userChat.updateMany(
        {$and:[
            {room:room},
            {receiver: sender},
            {sender: receiver.toLowerCase()},
            {isRead: false}
        ]},
        {$set:{
            isRead: true
        }}
    )
}

let chatsHandler = {
    saveNewMessage : async(message)=>{
        let messageData = new userChat(message)
        let savedata = await messageData.save()
        return savedata
    },
    
    getParticularRoomMessages : async(roomID,sender,receiver)=>{
        let messageData = await userChat.find({room:roomID},{text:1, sendDate:1, sender: 1})
        await setReadMessagesStatus(roomID,sender,receiver)
        return messageData
    },
    
    getRoomMessages : async(room)=>{
        let messageData = await userChat.find({room:room},{text:1, sendDate: 1, sender: 1})
        return messageData
    }
}

module.exports = chatsHandler