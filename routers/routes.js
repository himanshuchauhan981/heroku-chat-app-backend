const express = require('express')

const { users, showUsers,groupChatController } = require('../controllers')
const { authenticate } = require('../auth')
// const {upload} = require('../handlers').imageStorage

// app.use(upload.array());
// app.use(express.static('public'))

module.exports = ()=>{
    const router = express.Router();

    router.post('/api/signUp',users.saveNewUsers)

    router.post('/login',users.loginExistingUsers)

    router.get('/login/validate',authenticate,users.redirectUsers)

    router.get('/users',authenticate,showUsers.showAllActiveUsers)

    // router.post('/group',upload.single('groupImage'),groupChatController.saveGroupDetails)

    return router
}