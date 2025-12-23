const bcrypt = require('bcrypt'); // เรียกใช้เครื่องมือเข้ารหัส
const db = require('../config/database'); // เรียกตัวเชื่อมต่อ Database

exports.register = async (req, res) => {
    try {
        // 1. รับค่าที่ส่งมาจาก Postman (แกะกล่อง)
        const { username, password, first_name, last_name } = req.body;

        // 2. ตรวจสอบว่ากรอกครบไหม (Validation)
        if (!username || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        // 3. ตรวจสอบว่า Username นี้มีคนใช้ไปหรือยัง?
        // (Select ดูว่าเจอไหม)
        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว" });
        }

        // 4. เข้ารหัสรหัสผ่าน (Hashing) **จุดสำคัญ**
        // เปรียบเหมือนเอาหมูไปเข้าเครื่องบด (Salt = 10 รอบ)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. บันทึกลงฐานข้อมูล (Insert)
        // สังเกตว่าเราส่ง hashedPassword ไปเก็บ ไม่ใช่ password ธรรมดา
        await db.query(
            "INSERT INTO users (username, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)",
            [username, hashedPassword, first_name, last_name, 'user']
        );

        // 6. ตอบกลับว่าสำเร็จ
        res.status(201).json({ message: "ลงทะเบียนสำเร็จเรียบร้อย!" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดที่ระบบ Server" });
    }
};
