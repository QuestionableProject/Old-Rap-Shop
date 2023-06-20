const Router = require('express')
const router = new Router()
const admin = require('../controller/admin-controller');

router.post('/getorders', admin.getOrders)
router.post('/getusers', admin.getUsers)

module.exports = router