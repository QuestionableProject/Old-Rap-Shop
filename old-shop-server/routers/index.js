const Router = require('express')
const router = new Router()
const user = require("./user")
const basket = require("./basket")
const orders = require("./orders")
const admin = require("./admin")
const records = require("./records")

router.use('/user', user)
router.use('/order', orders)
router.use('/basket', basket)
router.use('/admin', admin)
router.use('/records', records)

module.exports = router