const {MONGO_HOSTNAME,MONGO_PORT, MONGO_DB} = require('./keys')

const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
const mlabURL = 'mongodb://admin:admin0018@ds349618.mlab.com:49618/smart-chat'

mongoose.connect(mlabURL,{useNewUrlParser: true, useCreateIndex: true},(err)=>{
    if(err) {
        console.log('Mongo error ',err)
    }
    else{
        gfs = Grid(mongoose.connection.db,mongoose.mongo)
        gfs.collection('uploads')
        console.log('Mongoose Connection is Successful')
    }
})