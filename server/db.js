const Pool = require("pg").Pool;
const { db } = require("./configuracion");

const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
});
module.exports = pool;