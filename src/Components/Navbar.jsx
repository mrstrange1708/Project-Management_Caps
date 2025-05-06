import React, { useContext, useEffect, useState } from 'react';
import { BellRing, Moon, Sun, UserRoundPen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TheamContext } from '../App.jsx';
import { userContext } from '../App.jsx';


const Navbar = () => {
    const { theam , settheam } = useContext(TheamContext);
    const { userdata } = useContext(userContext);

    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedTomorrow = tomorrow.toISOString().split('T')[0];

        if (userdata && userdata.projects) {
            const filteredTasks = userdata.projects.filter(task => task.deadline === formattedTomorrow);
            setUpcomingTasks(filteredTasks);
        }
    }, [userdata]);

    return (
        <div style={theam ? { backgroundColor: '#000' ,color : '#fff' } : { backgroundColor: '#fff' , color : '#000' }}
            className='flex justify-between items-center w-full h-[70px] px-6 border-b border-gray-700'
        >
            <Link className='text-3xl flex' to='/dashboard'>
            <img src="/assets/logo.png" alt="logo"  height={60} width={80}
            className='mr-5 rounded-xl'/>
            TaskFlow
            </Link>
            <p className={`text-xl  md:flex hidden`}>
                {userdata.displayName && `Welcome, Hello ${userdata.displayName}`}
            </p>
            <div className='flex items-center gap-6'>
                <button onClick={() => {
                    settheam(!theam);
                }}>
                    {theam ? <Moon size={32} className='text-white rounded-full' /> : <Sun size={32} />}
                </button>
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <BellRing />
                    </button>
                    {isDropdownOpen && (
                        <div 
                        style={theam ? { backgroundColor: '#000' ,color : '#fff' } : { backgroundColor: '#fff' , color : '#000' }}
                        className="absolute right-0 mt-2 w-[300px]   border rounded shadow z-50">
                            {upcomingTasks.length === 0 ? (
                                <p className="p-3 text-sm">No upcoming deadlines 🎉</p>
                            ) : (
                                upcomingTasks.map(task => (
                                    <p className="p-3 text-sm border-b" key={task.id}>
                                        ⏰ Deadline for <strong>{task.title}</strong> is tomorrow!
                                    </p>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <Link to="/login">
                    <UserRoundPen  />
                </Link>
            </div>
        </div>
    )
}

export default Navbar;