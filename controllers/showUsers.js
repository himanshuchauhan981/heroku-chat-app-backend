const { showUsersLogic } = require('../handlers')

const showAllActiveUsers  = async (username)=>{
    const response = await showUsersLogic.showAllUsers(username)
    return response
}

const makeUserOffine = async (username)=>{
    await showUsersLogic.makeUserOffline(username)
}

const makeUserOnline  = async (username)=>{
    await showUsersLogic.makeUserOnline(username)
}

module.exports = {
    showAllActiveUsers,
    makeUserOffine,
    makeUserOnline
}