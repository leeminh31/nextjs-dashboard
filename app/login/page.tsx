import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập',
};

export default function LoginPage() {
  return (
    <div id='root'>
      <div className="login-page">
        <LoginForm />
      </div>
    </div>
  );
}