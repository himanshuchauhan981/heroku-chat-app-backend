const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const {checkExisitingGroupName}  = require('./groupChatHandler')

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = require('../db').keys
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
const storage = new GridFsStorage({
    url: url,
    file: async(req, file) => {
        let status = await checkExisitingGroupName(req.body.groupName)
        if(!status){
            if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/jpg'||file.mimetype === 'image/png'){
                const buf = crypto.randomBytes(16)
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                return fileInfo
            }
            else return 'INVALID_IMAGE_TYPE_ERROR'
            
        }
        else return 'GROUP_EXIST_ERROR'
    }
})

const upload = multer({ storage })

module.exports = {
    upload
}
