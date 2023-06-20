const Router = require('express')
const router = new Router()
const order = require('../controller/order-controller')

router.post('/orderCastom', order.orderCastom)
router.post('/getOrders', order.getOrder)

module.exports = router