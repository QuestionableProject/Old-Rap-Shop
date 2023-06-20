const Router = require('express')
const router = new Router()
const records = require('../controller/records-controller')

router.get('/', records.getAll)
router.get('/:id', records.getOne)

module.exports = router