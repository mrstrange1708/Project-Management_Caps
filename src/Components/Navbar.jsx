import React, { useContext, useEffect, useState } from 'react';
import { BellRing, Moon, Sun, UserRoundPen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { TheamContext } from '../App.jsx';
import { userContext } from '../App.jsx';
import { fetchProjects } from '../services/projectService';
import { isAuthenticated } from '../services/authService';

const Navbar = () => {
    const { theam , settheam } = useContext(TheamContext);
    const { userdata } = useContext(userContext);
    const location = useLocation();

    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Check if user is authenticated and on a protected route
    const isUserAuthenticated = userdata && userdata.username && isAuthenticated();
    const isOnAuthPage = location.pathname === '/' || location.pathname === '/register';

    useEffect(() => {
        const loadUpcomingTasks = async () => {
            // Only fetch projects if user is authenticated and not on auth pages
            if (!isUserAuthenticated || isOnAuthPage) {
                setUpcomingTasks([]);
                return;
            }

            try {
                const response = await fetchProjects();
                const projects = response.data || response;
                
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const formattedTomorrow = tomorrow.toISOString().split('T')[0];

                if (Array.isArray(projects)) {
                    const filteredTasks = projects.filter(task => task.deadline === formattedTomorrow);
                    setUpcomingTasks(filteredTasks);
                }
            } catch (error) {
                console.error('Failed to fetch projects for upcoming tasks:', error);
                setUpcomingTasks([]);
            }
        };

        loadUpcomingTasks();
    }, [userdata, isUserAuthenticated, isOnAuthPage]);

    // Don't render authenticated features on auth pages
    if (isOnAuthPage) {
        return (
            <div style={theam ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
                className='flex justify-between items-center w-full h-[70px] px-6 border-b border-gray-700'>
                <Link className='flex items-center' to='/dashboard'>
                    <img src="/assets/logo.png" alt="logo"
                        className='mr-2 rounded-xl h-8 w-10 sm:h-[60px] sm:w-[80px]'
                    />
                    <span className='font-bold text-lg sm:text-3xl'>TaskFlow</span>
                </Link>
                <div className='flex items-center gap-6'>
                    <button onClick={() => settheam(!theam)} className='hidden sm:block'>
                        {theam ? <Moon size={32} className='text-white rounded-full' /> : <Sun size={32} />}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={theam ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
            className='flex justify-between items-center w-full h-[70px] px-6 border-b border-gray-700'>
            <Link className='flex items-center' to='/dashboard'>
                <img src="/assets/logo.png" alt="logo"
                    className='mr-2 rounded-xl h-8 w-10 sm:h-[60px] sm:w-[80px]'
                />
                <span className='font-bold text-lg sm:text-3xl'>TaskFlow</span>
            </Link>
            <p className={`text-base sm:text-xl md:flex hidden`}>
                {isUserAuthenticated ? `Welcome, ${userdata.username}` : ''}
            </p>
            <div className='flex items-center gap-6'>
                <button onClick={() => settheam(!theam)} className='hidden sm:block'>
                    {theam ? <Moon size={32} className='text-white rounded-full' /> : <Sun size={32} />}
                </button>
                {isUserAuthenticated && (
                    <>
                        <div className="relative hidden sm:block">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <BellRing />
                            </button>
                            {isDropdownOpen && (
                                <div
                                    style={theam ? { backgroundColor: '#000', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}
                                    className="absolute right-0 mt-2 w-[300px] border rounded shadow z-50">
                                    {upcomingTasks.length === 0 ? (
                                        <p className="p-3 text-sm">No upcoming deadlines 🎉</p>
                                    ) : (
                                        upcomingTasks.map(task => (
                                            <p className="p-3 text-sm border-b" key={task._id}>
                                                ⏰ Deadline for <strong>{task.title}</strong> is tomorrow!
                                            </p>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                        <Link to="/profile" className='hidden sm:block'>
                            <UserRoundPen />
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar;