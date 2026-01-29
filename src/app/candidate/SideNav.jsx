'use client';
import { SIDENAV_ITEMS } from './constant';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { IconBriefcase, IconChevronRight, IconLogout, IconMenu } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import ThemeToggler from '@/components/Navbar/ThemeToggler';

const SideNav = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();
  const handleLogout = async () => {
    toast.promise(axios.get('/spring-server/api/auth/logout'), {
      loading: 'Logging out...',
      success: () => { router.push('/'); return 'Logged out successfully'; },
      error: 'Error logging out',
    });
  };
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  if (!user) return null;
  return (
    <div className={drawer lg:drawer-open max-h-screen}>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        <div className='navbar justify-between bg-base-300 w-full pl-10'>
          <div className='lg:flex items-center justify-end space-x-2 hidden text-base-content'>
            <span className='text-base font-semibold'>Home</span>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={index}>
                <span className='text-sm'><IconChevronRight /></span>
                <span className='text-base capitalize'>{decodeURIComponent(segment.replace(/-/g, ' '))}</span>
              </React.Fragment>
            ))}
          </div>
          <div className='flex-none lg:hidden'>
            <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
              <IconMenu className='h-6 w-6' />
            </label>
          </div>
          <div className='hidden lg:flex items-center space-x-4'>
            <ThemeToggler />
            {user && <div className='flex items-center gap-2'><span>{user.fullName}</span></div>}
          </div>
        </div>
        <main className={overflow-y-auto h-[calc(100vh-5.3rem)]}>{children}</main>
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
        <div className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
          <div className='flex items-center justify-center mb-6'><span className='text-2xl font-bold'>Hire-Hub</span></div>
          <div className='flex flex-col space-y-2'>
            {SIDENAV_ITEMS.map((item, idx) => (
              <Link key={idx} href={item.path} className={lex items-center space-x-4 p-2 rounded }>
                {item.icon}<span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideNav;
