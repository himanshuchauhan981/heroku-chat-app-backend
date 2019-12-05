const {groupChatHandler} = require('../handlers')

const saveGroupDetails = async(req,res)=>{
    let response = await groupChatHandler.saveGroupDetails(req,res)
    return res.status(200).send(response)
}

const getAllMembers = async(req,res)=>{
    let response = await groupChatHandler.getAllMembers(req,res)
    return response
}

module.exports = {
    saveGroupDetails,
    getAllMembers
}