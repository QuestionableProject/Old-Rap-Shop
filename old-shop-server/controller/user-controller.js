const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const { User } = require('../models/models')
const crypto = require('crypto')
const path = require('path')
const fs = require("fs");

const generatejwt = (id, login) => {
    return JWT.sign(
        { id, login },
        process.env.SECRET_KEY,
        { expiresIn: '365d' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { login, password, nickname } = req.body
        const uuid = crypto.randomUUID()
        if (!login || !password) return next(ApiError.badRequest("Пустой запрос"))
        const OldUser = await User.findOne({ where: { login } })
        if (OldUser) return next(ApiError.badRequest("Такой пользователь уже существует"))
        const HashPass = await bcrypt.hash(password, 5)
        const user = await User.create({ uuid, login, password: HashPass, nickname })
        return res.json({ message: "Вы зарегистрировались" })
    }
    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ where: { login } })
        if (!user) return next(ApiError.badRequest("Пользователь не найден"))
        let checkpass = bcrypt.compareSync(password, user.password)
        if (!checkpass) return next(ApiError.badRequest("Не верный пароль"))
        const token = generatejwt(user.uuid)
        return res.json({ token: token, id: user.uuid, nickname: user.nickname, image: user.image, role: user.role })
    }
    async auth(req, res) {
        const user = await User.findOne({ where: { uuid: req.user.id, } })
        if (!user) return res.status(403).json({ message: "Не авторизован" })
        const token = generatejwt(req.user.id)
        return res.json({ token: token, id: user.uuid, nickname: user.nickname, image: user.image, role: user.role })
    }


    async userRename(req, res) {
        const { userId, name } = req.body

        const user = await User.findOne({ where: { uuid: userId } })

        user.nickname = name;

        await user.save();

        const token = generatejwt(user.uuid)
        return res.json({ message: "Имя изменено", token: token, id: user.uuid, nickname: name, image: user.image, role: user.role })
    }

    async userUpdateImage(req, res) {
        const { userId } = req.body
        const { image } = req.files
        const uuid = crypto.randomUUID()

        const fileName = uuid + ".jpg"
        image.mv(path.resolve(__dirname, '..', 'static/user', fileName))

        const user = await User.findOne({ where: { uuid: userId } })
        user.image = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}`
        await user.save();
        console.log(`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}`);
        const token = generatejwt(user.uuid)
        return res.json({ message: "Фото изменено", token: token, id: user.uuid, nickname: user.nickname, image: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}`, role: user.role })
    }
    async removeUser(req, res) {
        const { userId } = req.body;
        console.log(userId);
        await User.destroy({ where: { uuid: userId } });

        return res.json({ message: "Аккаунт удален. Нам жаль, что вам пришлось это сделать" });
    }
}

module.exports = new UserController()