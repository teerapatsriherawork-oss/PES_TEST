-- 1. เลือกใช้ฐานข้อมูล
USE personnel_eval_db;

-- 2. ล้างตารางเก่าทิ้ง (Reset)
DROP TABLE IF EXISTS users;

-- 3. สร้างตาราง (Schema)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- ต้องกว้าง 255 ตัวอักษร เพื่อรองรับรหัสที่ Hash แล้ว
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user', 'committee') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ข้อมูลตัวอย่าง (Seed Data)
-- พี่สมมติให้ทุกคนใช้รหัสผ่านว่า '1234' ไปก่อนนะครับ
-- INSERT INTO users (username, password, fullname, role) VALUES 
-- ('admin01',  '1234', 'Admin System', 'admin'),
-- ('user01',   '1234', 'Nai Somchai',  'user'),
-- ('eval01',   '1234', 'Kru Somsee',   'evaluator');
