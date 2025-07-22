import React, { useEffect, useContext, useState } from "react";
import { TheamContext } from "../App";
import BackgroundAnimation from "../services/BackgroundAnimation";
import { Play, Pause, ChevronRight, Clock, Users, Filter, RotateCcw } from 'lucide-react';
import { fetchProjects, createProject, deleteProject } from '../services/projectService';
import ActivityBar from "../Components/AcivityBar";
import Card from "../Components/Card";
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { theam } = useContext(TheamContext);
  const [projects, setProjects] = useState([]);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      const response = await fetchProjects();
      const data = response.data || response;
      setProjects(data);
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project!');
    }
  };

  const handleEdit = (id) => {

    window.location.href = `/projects?edit=${id}`;
  };

  const loadSampleProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://mocki.io/v1/972ded65-f2d8-4f83-bde6-4ba29350497b");
      const sampleData = await res.json();

      for (const sampleProject of sampleData) {
        try {
          const projectData = {
            title: sampleProject.title,
            description: sampleProject.description,
            priority: sampleProject.priority,
            status: sampleProject.status,
            start: sampleProject.start.$date || sampleProject.start,
            starttime: sampleProject.starttime,
            end: sampleProject.end.$date || sampleProject.end,
            endtime: sampleProject.endtime,
            deadline: (sampleProject.deadline.$date || sampleProject.deadline).split('T')[0],
            userEmail: 'junaidsamishaik@gmail.com'
          };

          await createProject(projectData);
        } catch (error) {
          console.error(`Failed to create sample project ${sampleProject.title}:`, error);
          toast.error(`Failed to create project: ${sampleProject.title}`);
        }
      }

      const response = await fetchProjects();
      const data = response.data || response;
      setProjects(data);
      toast.success("Sample projects loaded successfully!");
    } catch (err) {
      console.error('Failed to load sample projects:', err);
      toast.error("Failed to load sample projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        const data = response.data || response;
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    loadProjects();
  }, []);

  // Pomodoro Timer functionality
  useEffect(() => {
    let interval;
    if (isTimerRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pomodoroTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handlePomodoroStart = () => {
    setIsTimerRunning(true);
    toast.info('Pomodoro timer started!');
  };
  const handlePomodoroStop = () => {
    setIsTimerRunning(false);
    toast.info('Pomodoro timer stopped!');
  };
  const resetPomodoro = () => {
    setPomodoroTime(25 * 60);
    setIsTimerRunning(false);
    toast.info('Pomodoro timer reset!');
  };

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = projects.filter(project => 
    project.start <= today && project.end >= today
  );
  const upcomingEvents = projects.filter(project => 
    project.start > today
  );
  const upcomingDeadlines = [...projects]
    .filter(project => new Date(project.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5); // Show only next 5 deadlines

  return (
    <div className={`min-h-screen p-6 ${theam ? 'text-gray-200' : 'text-gray-800'} ml-[70px] md:ml-[80px]`}>
      <div className="absolute inset-0 -z-10 ml-[70px] md:ml-[80px]">
        <BackgroundAnimation />
      </div>

      {(!projects || projects.length === 0) && (
        <div className="flex justify-center mb-8">
          <button
            onClick={loadSampleProjects}
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            } shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Loading Sample Projects...</span>
              </div>
            ) : (
              'Load Sample Projects'
            )}
          </button>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-3 space-y-6">

          <div className={`rounded-xl p-6 ${theam ? 'bg-black/30' : 'bg-white/50'} backdrop-blur-md border ${theam ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <h2 className="text-xl font-semibold mb-4">Pomodoro Timer</h2>
            <div className="text-center mb-4">
              <div className="text-6xl font-mono mb-6">{formatTime(pomodoroTime)}</div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={isTimerRunning ? handlePomodoroStop : handlePomodoroStart}
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${isTimerRunning ? 'bg-red-500' : 'bg-blue-500'} hover:opacity-90 transition-opacity`}
                >
                  {isTimerRunning ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  onClick={resetPomodoro}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-500 hover:opacity-90 transition-opacity"
                >
                  <RotateCcw size={24} />
                </button>
              </div>
            </div>
          </div>


          <div className={`rounded-xl p-6 ${theam ? 'bg-black/30' : 'bg-white/50'} backdrop-blur-md border ${theam ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
              <div className={`px-3 py-1 rounded-full text-sm ${theam ? 'bg-gray-800' : 'bg-gray-200'}`}>
                {upcomingDeadlines.length}
              </div>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((project) => (
                  <div 
                    key={project._id}
                    className={`p-4 rounded-lg ${theam ? 'bg-gray-800/50' : 'bg-gray-100/50'} hover:scale-[1.02] transition-transform`}
                    onClick={() => handleEdit(project._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        project.priority === 'Hard' ? 'bg-red-500' :
                        project.priority === 'Medium' ? 'bg-orange-500' :
                        'bg-green-500'
                      }`} />
                      <span className="font-medium line-clamp-1">{project.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm opacity-70">
                      <Clock size={14} />
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 opacity-70">
                  No upcoming deadlines
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="col-span-12 lg:col-span-6 space-y-8">

          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Today's Events</h2>
              <div className={`px-3 py-1 rounded-full text-sm ${theam ? 'bg-gray-800' : 'bg-gray-200'}`}>
                {todayEvents.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {todayEvents.length > 0 ? (
                todayEvents.map((project) => (
                  <Card
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    description={project.description}
                    status={project.status}
                    start={project.start}
                    end={project.end}
                    priority={project.priority}
                    deadline={project.deadline}
                    onDelete={() => handleDelete(project._id)}
                    onEdit={() => handleEdit(project._id)}
                  />
                ))
              ) : (
                <div className={`text-center py-8 rounded-xl ${theam ? 'bg-gray-800/30' : 'bg-gray-100/30'}`}>
                  No events scheduled for today
                </div>
              )}
            </div>
          </section>


          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <div className={`px-3 py-1 rounded-full text-sm ${theam ? 'bg-gray-800' : 'bg-gray-200'}`}>
                {upcomingEvents.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((project) => (
                  <Card
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    description={project.description}
                    status={project.status}
                    start={project.start}
                    end={project.end}
                    priority={project.priority}
                    deadline={project.deadline}
                    onDelete={() => handleDelete(project._id)}
                    onEdit={() => handleEdit(project._id)}
                  />
                ))
              ) : (
                <div className={`text-center py-8 rounded-xl ${theam ? 'bg-gray-800/30' : 'bg-gray-100/30'}`}>
                  No upcoming events
                </div>
              )}
            </div>
          </section>
        </div>



        <div className="col-span-12 lg:col-span-3">
          <div className={`rounded-xl p-6 ${theam ? 'bg-black/30' : 'bg-white/50'} backdrop-blur-md border ${
            theam ? 'border-gray-700/50' : 'border-gray-200/50'
          } h-[500px]`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Activity</h2>
              <span className="text-sm text-green-500">+29%</span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <ActivityBar projects={projects} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
