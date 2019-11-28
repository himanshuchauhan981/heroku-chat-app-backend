const { chatHandler } = require('../handlers')

const saveNewMessage = async(message)=>{
    chatHandler.saveNewMessage(message)
}

const getParticularRoomMessages = async(room)=>{
    let messages = await chatHandler.getParticularRoomMessages(room)
    return messages
}

const getRoomMessages = async(req,res)=>{
    let messages = await chatHandler.getRoomMessages(req,res)
    res.status(200).send(messages)
}

module.exports = {
    saveNewMessage,
    getParticularRoomMessages,
    getRoomMessages
}