const os = require('os');

const HOSTNAME = os.hostname();
module.exports = {
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    host: HOSTNAME,
    user: "root",
    password: "1234",
    database: "solitaire"
};