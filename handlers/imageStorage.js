const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const {checkExisitingGroup} =require('./groupChatHandler')

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = require('../db').keys
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
const storage = new GridFsStorage({
    url: url,
    file: async(req, file) => {
        let status = await checkExisitingGroup(req.body.groupName)
        if(!status){
            const buf = crypto.randomBytes(16)
            const filename = buf.toString('hex') + path.extname(file.originalname)
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            }
            return fileInfo
        }
        else return 'GROUP_EXIST_ERROR'
    }
})

const upload = multer({ storage })

module.exports = {
    upload
}
