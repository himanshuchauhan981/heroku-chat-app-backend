const { users,userLoginStatus } = require('../models')
const bcryptjs = require('bcryptjs')
const {factories} = require('../factories')
const { tokenUtil } = require('../utils')

checkExistingUsers = async (username,email)=>{
    let existingUserStatus = await users.find({$or:[{"username":username},{"email":email}]})
    return existingUserStatus
}

generateHashedPassword = async (password) =>{
    let salt = bcryptjs.genSaltSync(10)
    let hashedPassword = bcryptjs.hashSync(password,salt)
    return hashedPassword
}

checkHashedPassword = async(password,hashedPassword)=>{
    let status = bcryptjs.compareSync(password,hashedPassword)
    return status
}

let userLogic = {
    saveNewUsers : async (req,res)=>{
        let status = await checkExistingUsers(req.body.username,req.body.email)
        if(status.length == 0){
            req.body.password =await generateHashedPassword(req.body.password)
            let signupdata = new users(req.body)
            let data = await signupdata.save()
            let statusData = factories.userLoginStatusObject(data.username,null)
            let loginStatusData = new userLoginStatus(statusData)
            await loginStatusData.save()
            return {isSignUpSuccessful: true, msg: 'User created Successfully', status: 200}
        }
        else{
            return {isSignUpSuccessful: false,msg:'User already existed', status: 200}
        }  
    },

    loginExistingUsers : async(req,res)=>{
        let status = await users.findOne({"username":req.body.loginusername})
        if(status != null){
            if(checkHashedPassword(req.body.loginpassword,status.password)){
                let token = tokenUtil.createJWTToken(status._id)
                await userLoginStatus.update({username:status.username},{$set:{isActive:'online'}})
                return {isLoginSuccessful: true,token: token}
            }
            else return {isLoginSuccessful: false, loginError:'Incorrect Credentials'}
        }
        else return {isLoginSuccessful: false, loginError:'Incorrect Credentials'}
    },

    saveGoogleUsers : async(req,res)=>{
        let status = await checkExistingUsers(req.body.givenName,req.body.email)
        if(status.length == 0){
            let signUpObject = factories.signupObject(req.body.googleId,req.body.givenName,null,'Google',req.body.imageUrl,req.body.email)
            let signupdata = new users(signUpObject)
            let data  = await signupdata.save()
            let statusData = factories.userLoginStatusObject(data._id,null)
            let loginStatusData = new userLoginStatus(statusData)
            await loginStatusData.save()
        }
        return {isSignUpSuccessful: true, msg: 'User created Successfully'}
    },

    redirectUsers : async (req,res)=>{
        let data;
        if(req.headers.accountProvider === 'Google'){
            data = await users.findOne({ "accountProvider.providerID":req.headers.id})
        }
        else if(req.headers.accountProvider === 'Email'){
            data = await users.findById(req.headers.id)
        }
        return {validate: true, currentUser: data.username}
    }
    
}




module.exports = userLogic