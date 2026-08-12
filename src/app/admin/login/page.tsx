import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata = {
  title: 'Admin Login | Personal Portfolio',
  description: 'Login to the admin dashboard',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <LoginForm />
    </div>
  );
}
