// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// จุดสำคัญ: การเชื่อมต่อ Database
// ==========================================
const connection = mysql.createPool({
  // 1. host: ต้องใช้ชื่อ 'Service Name' ที่ตั้งใน docker-compose.yml
  //    (ห้ามใช้ localhost เพราะมันคนละเครื่องกันในโลก Docker)
  host: 'db', 
  
  // 2. port: ใช้ 3306 เสมอ เพราะเราคุยกัน "วงใน" Docker
  //    (3307 เอาไว้ให้เครื่องข้างนอกคุยเท่านั้น)
  port: 3306,
  
  user: 'root',
  password: '1234',      // รหัสที่ตั้งไว้ใน docker-compose
  database: 'personnel_eval_db', // ชื่อ DB ใน init.sql
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Route ทดสอบ: ดึงรายชื่อ Users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Error connecting to database');
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});