const mongoose = require('mongoose')
const Grid = require('gridfs-stream')


const {MONGO_DB_USER,MONGO_DB_PASSWORD,MONGO_DB} = require('./keys')

const url = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@ds349618.mlab.com:49618/${MONGO_DB}`


mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },(err)=>{
    if(err) {
        console.log('Mongo error ',err)
    }
    else{
        gfs = Grid(mongoose.connection.db,mongoose.mongo)
        gfs.collection('uploads')
        console.log('Mongoose Connection is Successful')
    }
})