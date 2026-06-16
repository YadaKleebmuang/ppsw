import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// โหลด Environment Variables จากไฟล์ .env.local
dotenv.config({ path: '.env.local' });

// Replace these with your actual Firebase config or use dotenv
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedData = async () => {
  console.log('Seeding data...');

  try {
    // 1. Categories
    const categoryWebId = 'cat_web_app';
    await setDoc(doc(db, 'categories', categoryWebId), {
      nameTh: 'เว็บแอปพลิเคชัน',
      nameEn: 'Web Application',
      slug: 'web-application',
      displayOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const categoryChatbotId = 'cat_chatbot';
    await setDoc(doc(db, 'categories', categoryChatbotId), {
      nameTh: 'แชทบอท',
      nameEn: 'Chatbot',
      slug: 'chatbot',
      displayOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 2. Tech Stacks
    const techStacks = [
      { id: 'tech_nuxt', name: 'Nuxt 3', type: 'Frontend' },
      { id: 'tech_express', name: 'Express.js', type: 'Backend' },
      { id: 'tech_mysql', name: 'MySQL', type: 'Database' },
      { id: 'tech_rasa', name: 'Rasa', type: 'AI' },
      { id: 'tech_python', name: 'Python', type: 'Language' },
      { id: 'tech_dialogflow', name: 'Dialogflow', type: 'AI' },
      { id: 'tech_next', name: 'Next.js', type: 'Frontend' },
    ];

    for (const tech of techStacks) {
      await setDoc(doc(db, 'techStacks', tech.id), {
        name: tech.name,
        type: tech.type,
        displayOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // 3. Projects
    // COOS
    const p1Id = 'proj_coos';
    await setDoc(doc(db, 'projects', p1Id), {
      titleTh: 'COOS - ระบบจัดการสตูดิโอออนไลน์',
      titleEn: 'COOS - Online Studio Management System',
      slug: 'coos-online-studio',
      shortDescriptionTh: 'ระบบจัดการสตูดิโอและการสั่งซื้อออนไลน์',
      shortDescriptionEn: 'Online studio management and order system',
      overviewTh: 'ออกแบบฐานข้อมูลและระบบสำหรับให้ลูกค้าจัดการสตูดิโอ',
      overviewEn: 'Designed database schema and system architecture for studio management.',
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await setDoc(doc(db, 'projectCategories', 'pc_coos'), { projectId: p1Id, categoryId: categoryWebId });
    await setDoc(doc(db, 'projectTechStacks', 'pt_coos_1'), { projectId: p1Id, techStackId: 'tech_nuxt' });
    await setDoc(doc(db, 'projectTechStacks', 'pt_coos_2'), { projectId: p1Id, techStackId: 'tech_express' });
    await setDoc(doc(db, 'projectTechStacks', 'pt_coos_3'), { projectId: p1Id, techStackId: 'tech_mysql' });

    // SureAboutIt
    const p2Id = 'proj_sureaboutit';
    await setDoc(doc(db, 'projects', p2Id), {
      titleTh: 'SureAboutIt – แชทบอทให้ความรู้เรื่องเพศศึกษา',
      titleEn: 'SureAboutIt – Sexual Health Education Chatbot',
      slug: 'sure-about-it-chatbot',
      shortDescriptionTh: 'แชทบอทให้ความรู้เรื่องเพศศึกษา',
      shortDescriptionEn: 'Sexual health education chatbot using Dialogflow',
      overviewTh: 'พัฒนาแชทบอทด้วย Dialogflow และ LINE Messaging API บริหารจัดการโปรเจกต์เองทั้งหมด',
      overviewEn: 'Managed the full project lifecycle independently, from design to deployment.',
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await setDoc(doc(db, 'projectCategories', 'pc_sure'), { projectId: p2Id, categoryId: categoryChatbotId });
    await setDoc(doc(db, 'projectTechStacks', 'pt_sure_1'), { projectId: p2Id, techStackId: 'tech_dialogflow' });

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
