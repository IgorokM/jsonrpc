const mysql = require('mysql2/promise');
const configDb = require('./configDb');

const pool = mysql.createPool(configDb);

module.exports = pool;