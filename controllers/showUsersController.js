const { showUsersLogic } = require('../handlers')

let showUserController = {
    showAllActiveUsers : async (currentUser)=>{
        const response = await showUsersLogic.showAllUsers(currentUser)
        return response
    },
    
    makeUserOffine : async (username)=>{
        await showUsersLogic.makeUserOffline(username)
    },
    
    makeUserOnline : async (username)=>{
        await showUsersLogic.makeUserOnline(username)
    }
}

module.exports = showUserController