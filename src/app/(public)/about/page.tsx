export const metadata = {
  title: 'About Me | Personal Portfolio',
  description: 'Learn more about my background, education, and skills.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">เกี่ยวกับฉัน</h1>
        <p className="text-gray-500 text-lg">About Me</p>
        
        <div className="prose prose-gray prose-lg mt-8">
          <p className="text-gray-700 leading-relaxed">
            สวัสดีครับ ผมเป็นนักพัฒนาซอฟต์แวร์ที่หลงใหลในการสร้างสรรค์แอปพลิเคชันที่มีประสิทธิภาพและใช้งานง่าย 
            มีความสนใจเป็นพิเศษในด้าน Web Development และ AI Chatbot
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Hello, I am a software developer passionate about creating efficient and user-friendly applications.
            I have a special interest in Web Development and AI Chatbots.
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-gray-200" />

      <section className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">การศึกษา (Education)</h2>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start group">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</h3>
              <p className="text-gray-600">วิทยาการคอมพิวเตอร์ (Computer Science)</p>
            </div>
            <div className="mt-2 md:mt-0 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
              2020 - 2024
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gray-200" />

      <section className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">ทักษะ (Skills)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Frontend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Next.js / React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Vue.js / Nuxt 3</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Backend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Node.js / Express</li>
              <li>Python</li>
              <li>Firebase</li>
              <li>MySQL</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Other</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Git / GitHub</li>
              <li>Dialogflow / Rasa</li>
              <li>Figma</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
