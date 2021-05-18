const Sequelize = require('sequelize')
const pg = require('pg')
pg.defaults.ssl = true

let db
if (process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
} else {
    db = new Sequelize('postgres://localhost/Grace-Shopper', { logging: false })
}

module.exports = db
