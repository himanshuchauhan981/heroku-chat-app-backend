const signupObject = (id,username,password,accountProvider,userImage,email)=>{
    let obj =  {
        "username":username,
        "email":email,
        "password":password,
        "accountProvider":{
            "providerID":id,
            "provider":accountProvider
        },
        "userImage":userImage
    }
    return obj
}

const userLoginStatusObject = (name,status)=>{
    let obj = {
        username: name,
        userStatus: status,
    }
    return obj
}

module.exports = {
    signupObject,
    userLoginStatusObject
}