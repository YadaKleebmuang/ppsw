import Link from 'next/link';

export function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              Portfolio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors">หน้าแรก (Home)</Link>
              <Link href="/about" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors">เกี่ยวกับ (About)</Link>
              <Link href="/projects" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors">ผลงาน (Projects)</Link>
              <Link href="/resume" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors">เรซูเม่ (Resume)</Link>
              <Link href="/contact" className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors">ติดต่อ (Contact)</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
