const { chatHandler } = require('../handlers')

const saveNewMessage = async(message)=>{
    let newMessage = await chatHandler.saveNewMessage(message)
    return newMessage
}

const getParticularRoomMessages = async(room,sender,receiver)=>{
    let messages = await chatHandler.getParticularRoomMessages(room,sender,receiver)
    return messages
}

const getRoomMessages = async(room)=>{
    let messages = await chatHandler.getRoomMessages(room)
    return messages
}

module.exports = {
    saveNewMessage,
    getParticularRoomMessages,
    getRoomMessages
}