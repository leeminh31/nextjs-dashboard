import SideNav from '@/app/ui/dashboard/sidenav';
// import Header from '../ui/header';
import { Metadata } from 'next';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* <div className="w-full flex-none md:w-64">
        <Header/>
        <SideNav />
      </div> */}
      {children}
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};