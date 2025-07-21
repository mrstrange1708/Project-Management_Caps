import React from 'react'
import { LayoutGrid, CopyPlus, CalendarDays, UserRoundPen, Info } from 'lucide-react';
import { useContext } from 'react';
import { TheamContext, userContext } from '../App';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const Sidebar = () => {
  const { theam } = useContext(TheamContext);
  const { userdata } = useContext(userContext);
  const location = useLocation();


  const isUserAuthenticated = userdata && userdata.username && isAuthenticated();
  const isOnAuthPage = location.pathname === '/' || location.pathname === '/register';


  if (isOnAuthPage) {
    return null;
  }

  const sidebar = (
    <div
      style={theam ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
      className='h-screen flex-col transition-all duration-300 ease-in-out w-[60px] hover:w-[200px] overflow-hidden group border-r border-gray-700 hidden md:flex'
    >
      <div className='flex-grow'>
        <Link className='flex items-center gap-4 p-4 cursor-pointer' to = '/dashboard'>
          <div className="text-2xl"><LayoutGrid /></div>
          <span className='whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>Dashboard</span>
        </Link>
        <Link className='flex items-center gap-4 p-4 cursor-pointer' to = '/projects'>
          <div className="text-2xl"><CopyPlus /></div>
          <span className='whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>Projects</span>
        </Link>
        <Link className='flex items-center gap-4 p-4 cursor-pointer' to = '/calender'>
          <div className="text-2xl"><CalendarDays /></div>
          <span className='whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>Calendar</span>
        </Link>
        <Link className='flex items-center gap-4 p-4 cursor-pointer' to = '/about'>
          <div className="text-2xl"><Info /></div>
          <span className='whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>About</span>
        </Link>
      </div>
    </div>
  );
   

  const bottomNav = (
    <div 
    style={theam ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
    className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white border-t border-gray-300 py-2 md:hidden">
      <Link to="/dashboard" className="flex flex-col items-center">
        <LayoutGrid />
        <span className="text-xs">Dashboard</span>
      </Link>
      <Link to="/projects" className="flex flex-col items-center">
        <CopyPlus />
        <span className="text-xs">Projects</span>
      </Link>
      <Link to="/calender" className="flex flex-col items-center">
        <CalendarDays />
        <span className="text-xs">Calendar</span>
      </Link>
      <Link to="/about" className="flex flex-col items-center">
        <Info />
        <span className="text-xs">About</span>
      </Link>
    </div>
  );

  return (
    <>
      {sidebar}
      {bottomNav}
    </>
  );
}

export default Sidebar;
