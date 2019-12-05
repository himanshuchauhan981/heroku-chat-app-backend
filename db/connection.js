const {MONGO_HOSTNAME,MONGO_PORT, MONGO_DB} = require('./keys')

const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;


mongoose.connect(url,{useNewUrlParser: true, useCreateIndex: true},(err)=>{
    if(err) {
        console.log('Mongo error ',err)
    }
    else{
        gfs = Grid(mongoose.connection.db,mongoose.mongo)
        gfs.collection('uploads')
        console.log('Mongoose Connection is Successful')
    }
})