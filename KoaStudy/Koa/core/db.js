const Sequelize = require('sequelize')

const db = {
    dbName:'blog',
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
}
const sequelize = new Sequelize(db.dbName,db.user,db.password,{
    host:db.host,
    dialect:'mysql',
    logging:true,
    timezone:'+08:00',
    define:{

    }
})

module.exports = sequelize