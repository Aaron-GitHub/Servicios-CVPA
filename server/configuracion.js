require("dotenv").config();

module.exports={
    db: {
        user: process.env.DB_user,
        password: process.env.DB_password,
        host: process.env.DB_host,
        port: process.env.DB_port,
        database: process.env.DB_database
    }
}