const { objectParser } = require('../utils/utils')

const obj = objectParser(process.argv)

module.exports = {
    PORT: process.env.PORT || obj.PORT || 9000,
    HOST: process.env.HOST || obj.HOST || "127.0.0.1",
    baseURI: process.env.baseURI || obj.baseURI || "/chat",
    SECRET: "eyJhbGciOi",
    googleCredentials : {
        GOOGLECLIENTID : '15339551386-njop5oqdobuacm9rp1omeg185915o9u4.apps.googleusercontent.com',
        GOOGLECLIENTSECRET:'6lHGOZChzav94MHZuS3c8RCr'
    }
}