const { groupChatHandler } = require('../handlers')
const { upload } = require('../handlers').imageStorage


let groupChatController = {
    saveGroupDetails : async (req, res) => {
        let status = await groupChatHandler.checkExisitingGroupName(req.body.groupName)
        if (!status) {

        }

        // console.log('group chat controller')
        // console.log(req.file)
        // let response = await groupChatHandler.saveGroupDetails(req,res)
        return res.status(200).send({ msg: 'data saved' })
    }
}

module.exports = groupChatController