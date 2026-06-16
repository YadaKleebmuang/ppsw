import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-between sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Personal Portfolio. All rights reserved.
          </p>
        </div>
        <div className="mt-4 flex space-x-6 sm:mt-0">
          <Link href="/admin/login" className="text-gray-400 hover:text-gray-500 text-sm">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
