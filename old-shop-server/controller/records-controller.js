const {Records} = require('../models/models')

class RecordsController {
    async getAll(req,res) {
        const records = await Records.findAll()
        return res.json(records)
    }
    async getOne(req,res) {
        const {id} = req.params
        const records = await Records.findOne({
            where: {id},
        })
        return res.json(records)
    }
}

module.exports = new RecordsController()