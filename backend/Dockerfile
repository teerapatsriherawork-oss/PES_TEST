# 1. ใช้ Node.js เวอร์ชั่นเล็กเบา (Alpine Linux)
FROM node:18-alpine

# 2. กำหนดพื้นที่ทำงานข้างในกล่อง
WORKDIR /app

# 3. ก๊อปปี้ไฟล์รายการแพ็คเกจเข้าไปก่อน (เพื่อ Cache การ install)
COPY package*.json ./

# 4. ลงโปรแกรมตามรายการใน package.json
RUN npm install

# 5. ก๊อปปี้โค้ดทั้งหมดตามเข้าไป
COPY . .

# 6. เปิดพอร์ต 3000 ให้โลกภายนอกรู้
EXPOSE 3000

# 7. คำสั่งเมื่อกล่องเริ่มทำงาน
CMD ["node", "server.js"]