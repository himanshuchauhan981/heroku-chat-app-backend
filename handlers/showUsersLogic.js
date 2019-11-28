const { users,userLoginStatus } = require('../models')

const showAllUsers = async (username)=>{
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
    return allUsers
}

const makeUserOffline = async (username)=>{
    // console.log('making user offline : ',username)
    await userLoginStatus.update({username:username},{$set:{isActive: 'offline'}})
}

const makeUserOnline = async(username)=>{
    // console.log('making user online : ',username)
    await userLoginStatus.update({username:username},{$set:{isActive: 'online'}})
}

module.exports = {
    showAllUsers,
    makeUserOffline,
    makeUserOnline
}