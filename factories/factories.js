const signupObject = (id,username,password,accountProvider,userImage,email)=>{
    let obj =  {
        "username":username,
        "email":email,
        "password":password,
        "accountProvider":{
            "providerID":id,
            "provider":accountProvider
        },
        "userImage":userImage
    }
    return obj
}

const userLoginStatusObject = (name,status)=>{
    let obj = {
        username: name,
        userStatus: status,
    }
    return obj
}

const createRoom = (sender,receiver)=>{
    sender = sender.toLowerCase()
    receiver = receiver.toLowerCase()
    let roomArray = []
    roomArray.push(sender,receiver)
    let roomID = roomArray.sort().toString()
    return roomID
}

const userListObject = (userList,count) =>{
    return {
        "_id" : userList._id,
        "username" : userList.username,
        "isActive" : userList.usersInfo[0].isActive,
        "count" : count
    }
}

const createGroupDetailObject = (groupname,admin,status,image)=>{
    return {
        room: groupname,
        admin: admin,
        groupStatus: status,
        groupImage: image
    }
}
module.exports = {
    signupObject,
    userLoginStatusObject,
    createRoom,
    userListObject,
    createGroupDetailObject
}