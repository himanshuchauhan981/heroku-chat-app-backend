const jwt = require('jsonwebtoken')
let privateKey = "vkjgd234vbd"

let tokenUtil = {
    createJWTToken : (id)=>{
        var token = jwt.sign({ id, expiresIn: '24h' }, privateKey, {algorithm: 'RS256'});
        return token
    },

    decodeJWTToken : (token)=>{
        let tokenStatus = jwt.verify(token,new Buffer(process.env.SECRET,'base64'))
        return tokenStatus
    }    
}

module.exports = tokenUtil