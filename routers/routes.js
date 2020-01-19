const express = require('express')

const { userController, showUserController } = require('../controllers')
const { authenticate } = require('../auth')

module.exports = ()=>{
    const router = express.Router();

    router.post('/signUp',
        userController.saveNewUsers
    )

    router.post('/login',
        userController.loginExistingUsers
    )

    router.get('/login/validate',
        authenticate,
        userController.redirectUsers
    )

    router.get('/users',
        authenticate,
        showUserController.showAllActiveUsers
    )

    // router.post('/group',upload.single('groupImage'),groupChatController.saveGroupDetails)

    return router
}