const express = require('express')

const { users } = require('../controllers')

module.exports = ()=> {
    const router = express.Router();

    router.post('/google',users.saveGoogleUsers)

    return router
}