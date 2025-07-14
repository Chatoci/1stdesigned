# Facebook API Setup Guide

## การตั้งค่า Facebook API เพื่อดึงโพสต์จริง

### ขั้นตอนที่ 1: สร้าง Facebook App

1. ไปที่ [Facebook Developers](https://develope   rs.facebook.com/)
2. คลิก "Create App"
3. เลือก "Consumer" หรือ "Business"
4. กรอกข้อมูล App Name และ Contact Email

### ขั้นตอนที่ 2: เพิ่ม Facebook Login

1. ใน App Dashboard คลิก "Add Product"
2. เลือก "Facebook Login"
3. เลือก "Web" platform
4. กรอก URL ของเว็บไซต์

### ขั้นตอนที่ 3: สร้าง Access Token

1. ไปที่ [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. เลือก App ที่สร้างไว้
3. เพิ่ม permissions:
   - `pages_read_engagement`
   - `pages_show_list`
   - `pages_read_user_content`
4. คลิก "Generate Access Token"

### ขั้นตอนที่ 4: ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ root ของโปรเจค:

```env
REACT_APP_FACEBOOK_ACCESS_TOKEN=your_access_token_here
```

### ขั้นตอนที่ 5: ตรวจสอบ Page ID

Page ID ของคุณคือ: `61559057724990`

### หมายเหตุสำคัญ:

- Access Token มีอายุจำกัด (60 วัน)
- ต้องขอ permissions ที่เหมาะสม
- ควรใช้ Page Access Token สำหรับ Page posts
- ตรวจสอบ App Review status หากต้องการใช้ใน production

### การทดสอบ:

1. รัน `npm start`
2. ไปที่หน้า Home
3. ดูที่ Blog section
4. คลิกปุ่ม "รีเฟรช" เพื่อทดสอบการดึงข้อมูล

### หากไม่มี Access Token:

ระบบจะแสดงข้อมูลตัวอย่างแทนข้อมูลจริงจาก Facebook 