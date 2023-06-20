const { Orders, OrderCastomRecords, User } = require('../models/models')
const crypto = require('crypto');

class OrderController {
    async orderCastom(req, res) {
        const { name, email, address, phone, recordName, recordDescription, userId } = req.body
        const { recordImage, recordAudio } = req.files
        const options = JSON.parse(req.body.options);
        const uuid = crypto.randomUUID()

        if (userId !== "null") {
            const user = await User.findOne({where: {uuid: userId}})

            const orderCreate = await Orders.create({
                uuid,
                name,
                email,
                address,
                phone,
                userId: user.id,
                status: false
            })

            await OrderCastomRecords.create({
                recordName,
                recordDescription,
                recordAudio: "ghf",
                recordImage: "gfhg",
                width: options.widthImage,
                height: options.heightImage,
                positionX: options.positionX,
                positionY: options.positionY,
                background: options.background,
                orderId: orderCreate.id
            })

            return res.json({ order: true, id: uuid, message: `${user.nickname}, ваш заказ оформлен. Вы можете отследить статус заказа в личном кабинете.` });
        }
        const orderCreate = await Orders.create({
            uuid,
            name,
            email,
            address,
            phone,
            status: false
        })
        await OrderCastomRecords.create({
            recordName,
            recordDescription,
            recordAudio: "ghf",
            recordImage: "gfhg",
            width: options.widthImage,
            height: options.heightImage,
            positionX: options.positionX,
            positionY: options.positionY,
            background: options.background,
            orderId: orderCreate.id
        })

        return res.json({ order: true, id: uuid, message: "Заказ оформлен. Из-за того, что вы не зарегистрированы, вы не сможете отследить свой заказ." });
    }

    async orderRecord(req, res) {
        const { name, email, address, phone, userId, productId } = req.body

        if (userId !== "null") {
            const user = await User.findOne({where: {uuid: userId}});

            return res.json({ order: true, id: uuid, message: `${user.nickname}, ваш заказ оформлен. Вы можете отследить статус заказа в личном кабинете.` });
        }

        return res.json({ order: true, id: uuid, message: "Заказ оформлен. Из-за того, что вы не зарегистрированы, вы не сможете отследить свой заказ." });
    }
    async getOrder(req,res) {
        const {userId} = req.body
        
        const user = await User.findOne({where: {uuid: userId}})

        const order = await Orders.findAll({
            where: {userId: user.id},
            attributes: ['status', 'uuid']
        })
        console.log(order);
        if (order.length <= 0) return res.json({message: "У вас нет заказов"})
        
        return res.json(order)
    }
}

module.exports = new OrderController()