const { chatHandler } = require('../handlers')

let chatController = {
    saveNewMessage : async(message)=>{
        let newMessage = await chatHandler.saveNewMessage(message)
        return newMessage
    },
    
    getParticularRoomMessages : async(room,sender,receiver)=>{
        let messages = await chatHandler.getParticularRoomMessages(room,sender,receiver)
        return messages
    },
    
    getRoomMessages : async(room)=>{
        let messages = await chatHandler.getRoomMessages(room)
        return messages
    }
}

module.exports = chatController