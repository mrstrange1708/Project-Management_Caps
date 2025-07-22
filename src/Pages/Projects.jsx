import { Plus, Search, Filter, X, ChevronDown, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { TheamContext } from '../App'
import { v4 as uuidv4 } from 'uuid';
import Card from '../Components/Card'
import BackgroundAnimation from "../services/BackgroundAnimation";
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/projectService';

const Projects = () => {
  const { theam } = useContext(TheamContext);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [project, setProject] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    start: '',
    starttime: '',
    end: '',
    endtime: '',
    status: '',
    priority: '',
    deadline: ''
  });

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      const response = await fetchProjects();
      const data = response.data || response;
      setProjects(data);
    } catch (error) {
      console.error('Failed to delete project:', error);

    }
  };

  const handleEdit = (id) => {
    const projectToEdit = projects.find(p => p._id === id);
    if (projectToEdit) {

      const startDate = new Date(projectToEdit.start).toISOString().split('T')[0];
      const endDate = new Date(projectToEdit.end).toISOString().split('T')[0];
      
      setProject({
        id: projectToEdit._id,
        title: projectToEdit.title,
        description: projectToEdit.description,
        start: startDate,
        starttime: projectToEdit.starttime,
        end: endDate,
        endtime: projectToEdit.endtime,
        status: projectToEdit.status,
        priority: projectToEdit.priority,
        deadline: projectToEdit.deadline
      });
      setEditingId(id);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || project.status === filters.status;
    const matchesPriority = filters.priority === 'all' || project.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const currentProjects = filteredProjects?.filter(p => p.status === 'current') || [];
  const completedProjects = filteredProjects?.filter(p => p.status === 'completed') || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTime = new Date(`${project.start}T${project.starttime}`).toISOString();
    const endDateTime = new Date(`${project.end}T${project.endtime}`).toISOString();
    const payload = {
      title: project.title,
      description: project.description,
      priority: project.priority,
      status: project.status,
      start: startDateTime,
      starttime: project.starttime,
      end: endDateTime,
      endtime: project.endtime,
      deadline: project.deadline 
    };

    try {
      if (isEditing) {

        await updateProject(editingId, payload);
      } else {

        await createProject(payload);
      }
      

      const response = await fetchProjects();
      const data = response.data || response;
      setProjects(data);
      
      // Reset form
    setProject({
        id: uuidv4(),
      title: '',
      description: '',
      start: '',
      starttime: '',
      end: '',
      endtime: '',
      status: '',
      priority: '',
      deadline: ''
    });
    setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  useEffect(() => {
    fetchProjects().then((res) => {

      const data = res.data || res;
      setProjects(data);
    });
  }, []);

  return (
    <div className={`min-h-screen p-6 ${theam ? 'text-gray-200' : 'text-gray-800'} ml-[70px] md:ml-[80px]`}>
      <div className="absolute inset-0 -z-10 ml-[70px] md:ml-[80px]">
        <BackgroundAnimation />
      </div>

      {!showForm ? (
        <div className="max-w-[1600px] mx-auto">

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  theam 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'bg-white border-gray-200 text-gray-800'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    theam ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                  } transition-colors`}
                >
                  <Filter size={20} />
                  <span>Filters</span>
                  <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {showFilters && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10 ${
                    theam ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border p-3`}>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Status</label>
                        <select
                          value={filters.status}
                          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                          className={`w-full p-2 rounded ${
                            theam 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="all">All</option>
                          <option value="current">Current</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Priority</label>
                        <select
                          value={filters.priority}
                          onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                          className={`w-full p-2 rounded ${
                            theam 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="all">All</option>
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                title="Create New Project"
              >
                <Plus className="transform transition-transform hover:rotate-90 duration-300" />
              </button>
            </div>
          </div>


          <div className="space-y-8">

            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold">Current Projects</h2>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  theam ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  {currentProjects.length}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.length > 0 ? (
                  currentProjects.map((project) => (
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
                  <div className={`col-span-full text-center py-8 rounded-xl ${
                    theam ? 'bg-gray-800/30' : 'bg-gray-100/30'
                  }`}>
                    No current projects found
                  </div>
                )}
              </div>
            </section>


            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold">Completed Projects</h2>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  theam ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  {completedProjects.length}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedProjects.length > 0 ? (
                  completedProjects.map((project) => (
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
                  <div className={`col-span-full text-center py-8 rounded-xl ${
                    theam ? 'bg-gray-800/30' : 'bg-gray-100/30'
                  }`}>
                    No completed projects found
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className={`${
              theam ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-md rounded-xl p-8 border ${
              theam ? 'border-gray-700/50' : 'border-gray-200/50'
            } shadow-xl`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isEditing ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setEditingId(null);
                  setProject({
                    id: uuidv4(),
                    title: '',
                    description: '',
                    start: '',
                    starttime: '',
                    end: '',
                    endtime: '',
                    status: '',
                    priority: '',
                    deadline: ''
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Project title"
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theam 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  placeholder="Project description"
                  value={project.description}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theam 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={project.start}
                    onChange={(e) => setProject({ ...project, start: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theam 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    value={project.starttime}
                    onChange={(e) => setProject({ ...project, starttime: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theam 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={project.end}
                    onChange={(e) => setProject({ ...project, end: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theam 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input
                    type="time"
                    value={project.endtime}
                    onChange={(e) => setProject({ ...project, endtime: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theam 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={project.status}
                    onChange={(e) => setProject({ ...project, status: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theam 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="completed">Completed Project</option>
                    <option value="current">Current Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={project.priority}
                    onChange={(e) => setProject({ ...project, priority: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theam 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-white border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  value={project.deadline}
                  onChange={(e) => setProject({ ...project, deadline: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theam 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {isEditing ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setEditingId(null);
                    setProject({
                      id: uuidv4(),
                      title: '',
                      description: '',
                      start: '',
                      starttime: '',
                      end: '',
                      endtime: '',
                      status: '',
                      priority: '',
                      deadline: ''
                    });
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Projects;
