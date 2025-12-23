const mysql = require('mysql2');

// สร้างการเชื่อมต่อแบบ Pool (รองรับคนเข้าเยอะๆ ได้ดีกว่า)
const pool = mysql.createPool({
    host: 'db',             // ชื่อ Service ใน docker-compose
    user: 'root',           // User ตามที่ตั้งใน docker-compose
    password: '1234',       // Password ตามที่ตั้งใน docker-compose
    database: 'personnel_eval_db', // ชื่อ DB ตามที่ตั้งใน docker-compose
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ส่งออกแบบ Promise เพื่อให้ใช้ await ได้ใน Controller
module.exports = pool.promise();