const Router = require('express')
const router = new Router()
const user = require("../controller/user-controller")
const auth = require('../middlware/authmiddleware')

router.post('/registration', user.registration)
router.post('/login', user.login)
router.get('/auth',  auth, user.auth)

router.post('/userrename',  user.userRename)
router.post('/userupdateimage', user.userUpdateImage)
router.post('/removeuser', user.removeUser)

module.exports = router