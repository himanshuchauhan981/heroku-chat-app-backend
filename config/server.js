const dotenv = require('dotenv')
const express = require('express')
const app = express()

const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const socket = require('socket.io')

const { route } = require('../routes')
dotenv.config()

app.use(cors({ origin: 'https://smartchat0018.herokuapp.com' }))

app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://smartchat0018.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

require('../db').connection

const server = app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.log(err)
    else console.log(`Running on server successfully`)
})

app.use('/api', route())

const io = socket(server)

module.exports.io = io

const { SocketManager } = require('./socketManager')
io.on('connection', SocketManager)