import React, { useContext, useEffect, useState } from 'react';
import { userContext, TheamContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';
import { fetchProjects } from '../services/projectService';
import BackgroundAnimation from "../services/BackgroundAnimation";

const Profile = () => {
  const { userdata, setUser } = useContext(userContext);
  const { theam, settheam } = useContext(TheamContext);
  const [analytics, setAnalytics] = useState({ total: 0, completed: 0, pending: 0, easy: 0, medium: 0, hard: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    async function getAnalytics() {
      try {
        
        const projects = await fetchProjects();
        const total = projects.length;
        const completed = projects.filter(p => p.status === 'completed').length;
        const pending = total - completed;
        const easy = projects.filter(p => p.priority === 'Easy').length;
        const medium = projects.filter(p => p.priority === 'Medium').length;
        const hard = projects.filter(p => p.priority === 'Hard').length;
        setAnalytics({ total, completed, pending, easy, medium, hard });
      } catch (e) {
        setAnalytics({ total: 0, completed: 0, pending: 0, easy: 0, medium: 0, hard: 0 });
      }
    }
    getAnalytics();
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser({});
    navigate('/');
  };

  // Helper for avatar initial
  const getInitial = (name) => name ? name[0].toUpperCase() : (userdata.username ? userdata.username[0].toUpperCase() : 'U');

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start from-yellow-50 to-white py-10">
      <div className="absolute inset-0 -z-10">
        <BackgroundAnimation />
      </div>
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        {/* Personal Info Card */}
        <div className="flex-1 bg-white rounded-xl shadow p-8 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-3xl text-white font-bold">
              {getInitial(userdata.username)}
            </div>
            <div>
              <div className="text-xl font-bold">{userdata.username || 'User'}</div>
              <div className="text-gray-500">{userdata.email || 'N/A'}</div>
              <div className="flex gap-2 mt-2">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Active</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">Verified</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
          
            
            <div>
              <div className="font-medium">User ID</div>
              <div className="break-all text-xs mt-1">{userdata.id || userdata._id || 'N/A'}</div>
            </div>
            <div>
              <div className="font-medium">Provider</div>
              <div className="mt-1">email</div>
            </div>
          </div>
        </div>
        {/* Settings Card */}
        <div className="w-full md:w-72 bg-white rounded-xl shadow p-6 flex flex-col gap-6">
          <div className="font-semibold text-lg flex items-center gap-2 mb-2">⚙️ Settings</div>
          <div>
            <div className="font-medium mb-1">Theme</div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded border ${theam ? 'bg-black text-white' : 'bg-white text-black'} font-semibold`}
                onClick={() => settheam(true)}
              >Light</button>
              <button
                className={`px-3 py-1 rounded border ${!theam ? 'bg-black text-white' : 'bg-white text-black'} font-semibold`}
                onClick={() => settheam(false)}
              >Dark</button>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Notifications</div>
            <div className="flex items-center gap-2">
              <span>Email Notifications</span>
              <button className="p-1 rounded-full border bg-gray-100 text-gray-500 cursor-not-allowed" title="Coming soon">
                <span role="img" aria-label="bell">🔔</span>
              </button>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold mt-4"
          >
            Sign Out
          </button>
        </div>
      </div>
      {/* App Statistics Card */}
      <div className="w-full max-w-4xl mt-8">
        <div className="bg-white rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">📁</span>
            <div className="text-2xl font-bold">{analytics.total}</div>
            <div className="text-gray-500 text-sm">Projects</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">✅</span>
            <div className="text-2xl font-bold">{analytics.completed}</div>
            <div className="text-gray-500 text-sm">Completed</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🕒</span>
            <div className="text-2xl font-bold">{analytics.pending}</div>
            <div className="text-gray-500 text-sm">Pending</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🟢</span>
            <div className="text-2xl font-bold">{analytics.easy}</div>
            <div className="text-gray-500 text-sm">Easy</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🟠</span>
            <div className="text-2xl font-bold">{analytics.medium}</div>
            <div className="text-gray-500 text-sm">Medium</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🔴</span>
            <div className="text-2xl font-bold">{analytics.hard}</div>
            <div className="text-gray-500 text-sm">Hard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 