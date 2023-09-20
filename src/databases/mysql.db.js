const mysql = require('mysql2/promise');
const config = require('config');

const DB_HOST = config.get('DB_HOST');
const DB_PORT = config.get('DB_PORT');
const DB_NAME = config.get('DB_NAME');
const DB_USERNAME = config.get('DB_USERNAME');
const DB_USERNAME_PASSWORD = config.get('DB_USERNAME_PASSWORD');

const connectionOptions = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "Password123@",
    database: process.env.MYSQL_DATABASE || "test",
};



const pool = mysql.createPool(connectionOptions);

const connectToMySQL = async () => {
    try {
        await pool.getConnection();

        console.log('MySQL database connected!');
    } catch (err) {
        console.log('MySQL database connection error!');

        process.exit(1);
    }
};

connectToMySQL().then();

module.exports = pool;