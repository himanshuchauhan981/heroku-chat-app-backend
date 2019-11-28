const express = require('express')

const { users, showUsers,chatController } = require('../controllers')
const { authenticate } = require('../auth')


module.exports = ()=>{
    const router = express.Router();

    router.post('/signUp',users.saveNewUsers)

    router.post('/login',users.loginExistingUsers)

    router.get('/login/validate',authenticate,users.redirectUsers)

    router.get('/users',authenticate,showUsers.showAllActiveUsers)

    router.get('/chats',chatController.getRoomMessages)

    return router
}