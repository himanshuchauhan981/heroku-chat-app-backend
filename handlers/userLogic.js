const { users,userLoginStatus } = require('../models')
const bcryptjs = require('bcryptjs')
const {factories} = require('../factories')
const { tokenUtil } = require('../utils')

const checkExistingUsers = async(username,email)=>{
    let existingUserStatus = await users.find({$or:[{"username":username},{"email":email}]})
    return existingUserStatus
}

const saveNewUsers = async (req,res)=>{
    let status = await checkExistingUsers(req.body.username,req.body.email)
    if(status.length == 0){
        let salt = bcryptjs.genSaltSync(10)
        req.body.password = bcryptjs.hashSync(req.body.password,salt)
        let signupdata = new users(req.body)
        let data = await signupdata.save()
        let statusData = factories.userLoginStatusObject(data.username,null)
        let loginStatusData = new userLoginStatus(statusData)
        await loginStatusData.save()
        return {isSignUpSuccessful: true, msg: 'User created Successfully'}
    }
    else{
        return {isSignUpSuccessful: false,msg:'User already exist'}
    }   
}

const loginExistingUsers = async(req,res)=>{
    let status = await users.findOne({"username":req.body.loginusername})
    if(status != null){
        if(bcryptjs.compareSync(req.body.loginpassword,status.password)){
            let token = tokenUtil.createJWTToken(status._id)
            await userLoginStatus.update({username:status.username},{$set:{isActive:'online'}})
            return {isLoginSuccessful: true,token: token}
        }
        else return {isLoginSuccessful: false, loginError:'Incorrect Credentials'}
    }
    else return {isLoginSuccessful: false, loginError:'Incorrect Credentials'}
}

const saveGoogleUsers = async(req,res)=>{
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
}

const redirectUsers = async (req,res)=>{
    let data;
    if(req.headers.accountProvider === 'Google'){
        data = await users.findOne({ "accountProvider.providerID":req.headers.id})
    }
    else if(req.headers.accountProvider === 'Email'){
        data = await users.findById(req.headers.id)
    }
    return {validate: true, currentUser: data.username}
}


module.exports = {
    saveNewUsers,
    loginExistingUsers,
    saveGoogleUsers,
    redirectUsers
}