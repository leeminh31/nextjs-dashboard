import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function Header() {
  return (
    <div className="flex h-1/6">
      <div>
        HRM Admin
        
      </div>
      <div>

      </div>
    </div>
  );
}
