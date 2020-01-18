const { users,userLoginStatus,userChat } = require('../models')
const { factories } = require('../factories')

let getAllUnreadMessages = async (sender,allUsers)=>{
    let arr = []
    for(i=0;i<allUsers.length;i++){
        let receiver = allUsers[i].username
            let room = factories.createRoom(sender,receiver)
            let roomMessagesCount = await userChat.find({$and:[{sender:receiver},{receiver:sender},{room:room},{isRead:false}]}).count()
            if(allUsers[i] != undefined){
                userObject = await factories.userListObject(allUsers[i],roomMessagesCount)
                arr.push(userObject)
            }
    }
    return arr
}

let showUsersHandler = {
    
    showAllUsers : async (username)=>{
        let allUsers = await users.aggregate([
            {
                $lookup:{
                    from: 'loginstatuses',
                    localField:'username',
                    foreignField:'username',
                    as:"usersInfo"
                }
                
            },
            {
                $project:{ username: 1, "usersInfo.isActive":1 }
            }
        ])
        let data = await getAllUnreadMessages(username,allUsers)
        return data
    },
    
    makeUserOffline : async (username)=>{
        await userLoginStatus.update({username:username},{$set:{isActive: 'offline'}})
    },
    
    makeUserOnline : async(username)=>{
        await userLoginStatus.update({username:username},{$set:{isActive: 'online'}})
    }
}

module.exports = showUsersHandler