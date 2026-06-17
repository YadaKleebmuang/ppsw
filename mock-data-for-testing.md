# ข้อมูลสำหรับทดสอบระบบ Admin (Mock Data)

ไฟล์นี้เตรียมไว้เพื่อให้คุณสามารถ Copy ข้อมูลไปวางในหน้าฟอร์มของระบบ Admin ได้อย่างสะดวกครับ

---

## 1. หมวดหมู่ผลงาน (Categories)
ไปที่: `http://localhost:3000/admin/categories`
ควรสร้างเป็นอันดับแรกเพื่อใช้เชื่อมโยงกับ Project

**หมวดหมู่ที่ 1:**
- Name: `Web Application`
- Slug: `web-application`
- Description: `โปรเจกต์ประเภทเว็บไซต์และแอปพลิเคชันบนเบราว์เซอร์`
- Order: `1`

**หมวดหมู่ที่ 2:**
- Name: `Mobile Application`
- Slug: `mobile-application`
- Description: `แอปพลิเคชันบนระบบปฏิบัติการ iOS และ Android`
- Order: `2`

---

## 2. เทคโนโลยีที่ใช้ (Tech Stacks)
ไปที่: `http://localhost:3000/admin/tech-stacks`

- Name: `Next.js` | Slug: `nextjs` | Icon: `SiNextdotjs`
- Name: `React` | Slug: `react` | Icon: `SiReact`
- Name: `TypeScript` | Slug: `typescript` | Icon: `SiTypescript`
- Name: `Tailwind CSS` | Slug: `tailwindcss` | Icon: `SiTailwindcss`
- Name: `Firebase` | Slug: `firebase` | Icon: `SiFirebase`

---

## 3. ทักษะ (Skills)
ไปที่: `http://localhost:3000/admin/skills`

**ทักษะที่ 1:**
- Name: `Frontend Development`
- Category: `Development`
- Level: `Expert` (หรือใส่ตัวเลข 90)
- Order: `1`

**ทักษะที่ 2:**
- Name: `UI/UX Design`
- Category: `Design`
- Level: `Intermediate` (หรือใส่ตัวเลข 70)
- Order: `2`

---

## 4. ประวัติการศึกษา (Educations)
ไปที่: `http://localhost:3000/admin/educations`

- Institution (ชื่อสถาบัน): `มหาวิทยาลัยเทคโนโลยี...`
- Degree (วุฒิ): `ปริญญาตรี (B.Sc.)`
- Faculty (คณะ): `คณะเทคโนโลยีสารสนเทศ`
- Major (สาขา): `วิทยาการคอมพิวเตอร์ (Computer Science)`
- Start Year: `2019`
- End Year: `2023`
- Description (คัดลอกลงไปได้เลย):
```text
- สำเร็จการศึกษาด้วยเกียรตินิยม
- โปรเจกต์จบ (Senior Project): ระบบ AI ตรวจจับใบหน้า
- เป็นประธานชมรมคอมพิวเตอร์
```

---

## 5. ประสบการณ์ทำงาน (Experiences)
ไปที่: `http://localhost:3000/admin/experiences`

- Title (ตำแหน่ง): `Frontend Web Developer`
- Organization (บริษัท): `Tech Innovate Co., Ltd.`
- Type: `Full-time`
- Start Date: `01/06/2023`
- End Date: `(ติ๊กเลือก ปัจจุบันยังทำงานอยู่ที่นี่)`
- Description (คัดลอกลงไปได้เลย):
```text
- พัฒนาระบบ Web Application สำหรับลูกค้าองค์กร
- ทำงานร่วมกับทีม UX/UI และ Backend ด้วยกระบวนการ Agile
- ปรับปรุงประสิทธิภาพของเว็บไซต์ (Web Vitals) ให้รวดเร็วขึ้น 40%
```

---

## 6. โปรไฟล์ส่วนตัว (Profile)
ไปที่: `http://localhost:3000/admin/profile`

- Full Name: `(ชื่อ-นามสกุลของคุณ)`
- Headline: `Full Stack Web Developer`
- Bio: `หลงใหลในการเขียนโค้ดและสร้างสรรค์ Digital Product ที่ตอบโจทย์การใช้งานของผู้คน`
- About (คัดลอกลงไปได้เลย):
```text
สวัสดีครับ! ฉันเป็นนักพัฒนาซอฟต์แวร์ที่มีประสบการณ์ในการสร้าง Web Application สมัยใหม่ 
ฉันสนุกกับการแก้ปัญหาที่ท้าทายและการเรียนรู้เทคโนโลยีใหม่ๆ อยู่เสมอ 

เครื่องมือหลักที่ฉันถนัดคือ React, Next.js, และ Node.js 
เวลาว่างฉันมักจะศึกษาเกี่ยวกับการออกแบบ UI/UX หรือเขียนบล็อกแบ่งปันความรู้ครับ
```

---

## 7. ผลงาน (Projects)
ไปที่: `http://localhost:3000/admin/projects/create`

- Title (EN): `E-Commerce Dashboard`
- Title (TH): `ระบบหลังบ้านจัดการร้านค้าออนไลน์`
- Slug: `ecommerce-dashboard`
- Category: `(เลือก Web Application ที่สร้างไว้ในข้อ 1)`
- Short Description: `ระบบ CMS และ Dashboard สำหรับจัดการสินค้า ออเดอร์ และดูสถิติยอดขายร้านค้าออนไลน์แบบครบวงจร`
- Problem: `เจ้าของร้านค้าใช้เวลาประมวลผลยอดขายแต่ละเดือนนานเกินไปผ่าน Excel`

- Full Content (คัดลอกลงไปได้เลย รองรับ Markdown):
```markdown
โปรเจกต์นี้ถูกออกแบบมาเพื่อช่วยให้เจ้าของร้านค้าขนาดกลางสามารถจัดการร้านค้าได้อย่างมีประสิทธิภาพ 
ระบบสามารถสร้าง **รายงานยอดขาย (Sales Report)** ออกมาเป็นกราฟแท่งและกราฟวงกลมได้ทันที

### ความท้าทายที่พบ
การจัดการข้อมูลออเดอร์ปริมาณมหาศาลทำให้ฐานข้อมูลหน่วง เราแก้ไขด้วยการใช้เทคนิค Pagination และ Caching
```

- Objectives (เป้าหมาย - คัดลอกไปวางได้เลย):
```text
ลดเวลาในการทำบัญชีรายเดือน
ควบคุมและตรวจสอบสต๊อกสินค้าได้แบบ Real-time
```

- Key Features (ฟีเจอร์หลัก - คัดลอกไปวางได้เลย):
```text
มีระบบ Login แบ่งสิทธิ์ Admin/Staff
ดูกราฟยอดขายรายวัน/รายเดือน
อัปโหลดรูปภาพสินค้าได้หลายรูป
```

- My Role (บทบาท - คัดลอกไปวางได้เลย):
```text
ออกแบบ Database Schema ทั้งหมด
พัฒนา API ด้วย Node.js
วางระบบ Architecture ของ Frontend
```

- Results (ผลลัพธ์ - คัดลอกไปวางได้เลย):
```text
ลดเวลาการทำงานของพนักงานลงได้ 60%
ป้องกันข้อผิดพลาดในการแพ็คสินค้าผิดได้ 100%
```

อย่าลืมทดสอบฟีเจอร์ **อัปโหลดรูปภาพ** ด้วยนะครับ!
