const {userLogic} = require('../handlers')

const saveNewUsers = async (req,res)=>{
    let response = await userLogic.saveNewUsers(req,res)
    return res.status(200).json(response)
}

const loginExistingUsers = async (req,res)=>{
    let response = await userLogic.loginExistingUsers(req,res)
    if(response.isLoginSuccessful){
        return res.status(200).json(response)
    }
    return res.status(401).json(response)
}

const redirectUsers = async (req,res)=>{
    let response = await userLogic.redirectUsers(req,res)
    return res.status(200).json(response)
}

const saveGoogleUsers = async (req,res)=>{
    let response = await userLogic.saveGoogleUsers(req,res)
    return res.status(200).json(response)
}


module.exports = {
    saveNewUsers,
    loginExistingUsers,
    redirectUsers,
    saveGoogleUsers
}