const mysql = require('mysql2');
const pw = require('./pw');

var config = module.exports;

config.db = mysql.createConnection({
    user: 'admin',
    host: 'hackpsu.cphazmuul43v.us-east-2.rds.amazonaws.com',
    password: `${pw}`,
    database: 'hackpsu'
});

config.db.connect((err) => {
    if (err) throw err;
    console.log('Connected to Mysql');
});

config.express = {
    port: 3001,
};