const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) =>
  err ? console.log(`Error connecting to db ${err.stack}`) : console.log(`database connected successfully `)
);

module.exports = db;