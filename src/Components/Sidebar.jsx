import React from 'react'
import { LayoutGrid, CopyPlus, CalendarDays , Settings } from 'lucide-react';
import { useContext , useState } from 'react';
import { TheamContext,userContext } from '../App';
import { Link } from 'react-router-dom';  
import { logoutUser } from '../services/authService'; 
import { useNavigate } from 'react-router-dom';




const Sidebar = () => {
  const { theam } = useContext(TheamContext);
  const [showSettings, setShowSettings] = useState(false);
  const navigete = useNavigate();
  const {  setUser } = useContext(userContext);


  return (
    <div
      style={theam ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
      className='h-screen flex flex-col transition-all duration-300 ease-in-out w-[60px] hover:w-[200px] overflow-hidden group border-r border-gray-700'
      onMouseLeave={() => setShowSettings(false)}
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
      </div>

      <div className="relative flex flex-col items-center">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          
          className="flex items-center gap-4 p-4 cursor-pointer relative group w-full"
        >
          <div className="text-2xl"><Settings /></div>
          <span className="whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            Settings
          </span>

          {showSettings && (
            <div className="absolute bottom-full mb-2 w-3/4 p-2 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 z-50">
              <button 
                onClick={() => {
                  navigete('/');
                  logoutUser()
                  setUser({});
                  
                }}
                className="w-2/3 text-center py-2 bg-red-500 hover:bg-red-600 rounded-md transition-all"
              >
                Logout
              </button>
              
            </div>
          )}
        </button>
      </div>
      
    </div>
  );
}

export default Sidebar;
