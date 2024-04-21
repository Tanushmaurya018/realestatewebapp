const mysql =require('mysql2')

const pool = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "tAnush@0018",
    database: "realestatedb"
  });

//   pool.getConnection((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//       console.log('Connection created with MySQL successfully');
//   });

module.exports = { pool };
