const express = require('express')

const { userController } = require('../controllers')

module.exports = ()=> {
    const router = express.Router();

    router.post('/google',
        userController.saveGoogleUsers
    )

    return router
}