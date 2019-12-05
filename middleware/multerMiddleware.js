const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = require('../db').keys
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`

const storage = new GridFsStorage({
    url: url,
    file: async (req, file) => {
        const buf = crypto.randomBytes(16)
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            const filename = buf.toString('hex') + path.extname(file.originalname)
            return {
                filename: filename,
                bucketName: 'photos'
            }
        }
    }
})

const upload = multer({ storage })

module.exports = {
    upload,
    storage
}
