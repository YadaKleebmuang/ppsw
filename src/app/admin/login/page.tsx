import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata = {
  title: 'Admin Login | Personal Portfolio',
  description: 'Login to the admin dashboard',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
}
