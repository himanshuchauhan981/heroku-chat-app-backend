const express = require('express')

const { users, showUsers,groupChatController } = require('../controllers')
const { authenticate } = require('../auth')
const {upload} = require('../handlers').imageStorage

module.exports = ()=>{
    const router = express.Router();

    router.post('/signUp',users.saveNewUsers)

    router.post('/login',users.loginExistingUsers)

    router.get('/login/validate',authenticate,users.redirectUsers)

    router.get('/users',authenticate,showUsers.showAllActiveUsers)

    router.post('/group',upload.single('groupImage'),groupChatController.saveGroupDetails)

    router.get('/group/addMembers',async(req,res)=>{
        let response = await groupChatController.getAllMembers(req,res)
        return res.status(200).send(response)
    })

    return router
}