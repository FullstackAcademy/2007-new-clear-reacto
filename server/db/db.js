const Sequelize = require('sequelize')
//Don't forget to create a database named 'Grace-Shopper'
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/Grace-Shopper', {logging: false})

module.exports = db
