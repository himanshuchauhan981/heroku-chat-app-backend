const { OAuth2Client } = require('google-auth-library')

const {tokenUtil} = require('../utils')
const { config } = require('../config')

module.exports = checkAuthentication = (req,res,next)=>{
    let accountProvider = req.query.accountProvider
    if(accountProvider === "Email"){
        validateEmailToken(req,res,next)
    }
    else if(accountProvider === "Google"){
        validateGoogleToken(req,res,next)
    }
}

const validateGoogleToken = async (req,res,next)=>{
    const client = new OAuth2Client(config.googleCredentials.GOOGLECLIENTID)
    const token = req.query.token
    try{
        // const tokenInfo = await client.getTokenInfo(token)
        // console.log(tokenInfo)
        const ticket = await client.verifyIdToken({
            idToken : token,
            audience : config.googleCredentials.GOOGLECLIENTID
        })
        const payload = ticket.getPayload()
        req.headers.id = payload['sub']
        req.headers.accountProvider = "Google"
        next()
    }
    catch(err){
        res.status(403).send({loginError:'Login again'})
    }
}

const validateEmailToken = (req,res,next)=>{
    let token = req.query.token
    try{
        let decoded = tokenUtil.decodeJWTToken(token)
        req.headers.id = decoded.id
        req.headers.accountProvider = "Email"
        next()
    }
    catch(err){
        res.status(403).send({loginError:'Login again'})
    }
}