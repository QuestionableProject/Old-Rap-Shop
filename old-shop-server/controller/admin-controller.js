const { User, Orders } = require('../models/models')

class AdminController {
    async getOrders(req, res) {
        const { userId } = req.body

        const user = await User.findOne({
            where: { uuid: userId },
        })

        if (user.role !== "admin") return false

        const order = await Orders.findAll()

        return res.json(order);
    }

    async getUsers(req,res) {
        const { userId } = req.body

        const user = await User.findOne({
            where: { uuid: userId },
        })

        if (user.role !== "admin") return false

        const users = await User.findAll({
            attributes: ["uuid", "login", "nickname", "role","createdAt"],
        })

        return res.json(users);
    }
}

module.exports = new AdminController()