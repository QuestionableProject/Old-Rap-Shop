const sequelize = require("../db")
const { DataTypes } = require("sequelize")


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    nickname: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "user" },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
})
const Records = sequelize.define('records', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    audioName: { type: DataTypes.STRING },
    audioImage: { type: DataTypes.STRING, allowNull: true },
    actor: { type: DataTypes.STRING },
    album: { type: DataTypes.STRING, allowNull: true },
    albumImage: { type: DataTypes.STRING, allowNull: true },
    prise: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
})
const Baskets = sequelize.define('baskets', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const BasketRecords = sequelize.define('basketrecords', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})

const Orders = sequelize.define('orders', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const OrderRecords = sequelize.define('orderrecords', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const OrderCastomRecords = sequelize.define('ordercastomrecords', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    recordName: { type: DataTypes.STRING },
    recordDescription: { type: DataTypes.STRING },
    recordAudio: { type: DataTypes.STRING },
    recordImage: { type: DataTypes.STRING },
    width: { type: DataTypes.INTEGER },
    height: { type: DataTypes.INTEGER },
    positionX: { type: DataTypes.INTEGER },
    positionY: { type: DataTypes.INTEGER },
    background: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})

User.hasOne(Baskets)
Baskets.belongsTo(User)

Baskets.hasMany(BasketRecords)
BasketRecords.belongsTo(Baskets)

Records.hasOne(BasketRecords)
BasketRecords.belongsTo(Records)

User.hasMany(Orders)
Orders.belongsTo(User)

Orders.hasMany(OrderRecords)
OrderRecords.belongsTo(Orders)

Orders.hasMany(OrderCastomRecords)
OrderCastomRecords.belongsTo(Orders)

Records.hasOne(OrderRecords)
OrderRecords.belongsTo(Records)

module.exports = {
    User,
    Records,
    Baskets,
    BasketRecords,
    Orders,
    OrderRecords,
    OrderCastomRecords,
}