const {groupDetails} = require('../models')
const { factories } = require('../factories')

let groupChatHandler = {
    checkExisitingGroupName : async(name)=>{
        const groupData = await groupDetails.find({room:name})
        if(groupData.length == 0) return false
        else return true
    },
    
    saveGroupDetails : async(req,res)=>{
        const status = await checkExisitingGroup(req.body.groupName)
        if(!status){
            let groupDetailObject = factories.createGroupDetailObject(req.body.groupName,req.body.admin,req.body.groupStatus,req.file.filename)
            let groupData = new groupDetails(groupDetailObject)
            await groupData.save()
        }
        return "data saved Successfully"
    }
}

module.exports = groupChatHandler