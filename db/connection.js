const mongoose = require('mongoose')

mongoose.set('useNewUrlParser',true)
mongoose.set('useUnifiedTopology',true)

const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

const mlabUrl = `mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds349618.mlab.com:49618/smart-chat`

mongoose.connect(mlabUrl, (err,conn) => {
    if (err) {
        console.log('Mongo error ', err)
    }
    else {
        console.log('Mongoose Connection is Successful')
    }
})