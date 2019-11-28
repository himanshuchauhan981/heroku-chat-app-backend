const jwt = require('jsonwebtoken')
const {config} = require('../config')

const createJWTToken = (id)=>{
    var token = jwt.sign({ id, expiresIn: '24h' }, new Buffer(config.SECRET, 'base64'));
    return token
}

const decodeJWTToken = (token)=>{
    let tokenStatus = jwt.verify(token,new Buffer(config.SECRET,'base64'))
    return tokenStatus
}

module.exports = {
    createJWTToken,
    decodeJWTToken
}