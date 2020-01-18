const {userLogic} = require('../handlers')

let userController = {
    saveNewUsers : async (req,res)=>{
        let response = await userLogic.saveNewUsers(req,res)
        return res.status(200).json(response)
    },
    
    loginExistingUsers : async (req,res)=>{
        let response = await userLogic.loginExistingUsers(req,res)
        if(response.isLoginSuccessful){
            return res.status(200).json(response)
        }
        return res.status(401).json(response)
    },
    
    redirectUsers : async (req,res)=>{
        let response = await userLogic.redirectUsers(req,res)
        return res.status(200).json(response)
    },
    
    saveGoogleUsers : async (req,res)=>{
        let response = await userLogic.saveGoogleUsers(req,res)
        return res.status(200).json(response)
    }
}




module.exports = userController