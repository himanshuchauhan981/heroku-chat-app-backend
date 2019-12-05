const {groupDetails,users} = require('../models')
const { factories } = require('../factories')

const checkExisitingGroupName = async(name)=>{
    const groupData = await groupDetails.find({room:name})
    if(groupData.length == 0) return false
    else return true
}

const saveGroupDetailsWithoutImage = async (req)=>{
    let status = checkExisitingGroupName(req.body.groupName)
    if(!status){
        groupDetailObject = factories.createGroupDetailObject(req.body.groupName,req.body.admin,req.body.groupStatus,null)
        let groupData = new groupDetails(groupDetailObject)
        await groupData.save()
        return {msg:'Group created Successfully'}
    }
    return {msg:'Group already Exists'}
}

const saveGroupDetails = async(req,res)=>{
    let groupDetailObject
    if(req.file === undefined){
        let msg = saveGroupDetailsWithoutImage(req)
        return msg
    }
    else if(req.file.filename === 'GROUP_EXIST_ERROR'){
        return {msg:'Group already Exists'}
    }
    else if(req.file.filename === 'INVALID_IMAGE_TYPE_ERROR'){
        return {msg:'Invalid Image Type'}
    }
    else {
        groupDetailObject = factories.createGroupDetailObject(req.body.groupName,req.body.admin,req.body.groupStatus,req.file.filename)
        let groupData = new groupDetails(groupDetailObject)
        await groupData.save()
        return {msg:'Group created Successfully'}
    }
}

const getAllMembers = async(req,res)=>{
    let data = await users.find().select(   {username:1});
    return data
}

module.exports = {
    saveGroupDetails,
    checkExisitingGroupName,
    getAllMembers
}