const { userChat } = require('../models')

const saveNewMessage = async(message)=>{
    let messageData = new userChat(message)
    await messageData.save()
}

const getParticularRoomMessages = async(roomID)=>{
    let messageData = await userChat.find({room:roomID},{text:1, sendDate:1, sender: 1})
    return messageData
}

const getRoomMessages = async(req,res)=>{
    let messageData = await userChat.find({room:req.query.room},{text:1, sendDate: 1, sender: 1})
    return messageData
}

module.exports = {
    saveNewMessage,
    getParticularRoomMessages,
    getRoomMessages
}