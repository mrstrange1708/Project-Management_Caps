import { Plus } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { TheamContext, userContext } from '../App'
import { v4 as uuidv4 } from 'uuid';
import Card from '../Components/Card'
import BackgroundAnimation from "../services/BackgroundAnimation";
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/projectService';



const Projects = () => {
  const { theam } = useContext(TheamContext);
  const { userdata } = useContext(userContext);
  const [projects, setProjects] = useState([]);
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
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProjects = projects?.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div
    style={theam ? { color : "#fff" } : { color: "#000" }}
      className='flex flex-col items-center justify-start min-h-screen '
    >
      <div className="absolute inset-0 -z-10">
        <BackgroundAnimation />
      </div>
      {!showForm &&
        <div
          className="flex flex-col items-center justify-center w-full bg-cover bg-center m-10">
          <div className="flex  justify-between items-center w-full px-8 max-w-6xl m-8">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-2/3 p-2  border border-gray-500 rounded text-black"
            />
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 text-white p-3 shadow-lg hover:bg-blue-600 transition-all ml-4 group cursor-pointer outline-none hover:rotate-90 duration-300 radius-full rounded-full"
              title="Create New Project"
            >
              <Plus />
            </button>
            
          </div>
          {searchTerm ? (
            <div className="flex flex-col gap-7 w-full px-8 max-w-6xl mx-auto">
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
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
                <p className="text-center text-white">No matching projects found.</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-8 mt-4 w-full max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-extrabold border-b border-gray-300 pb-2">Current Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 wrap gap-5 "
              >
                {(projects?.filter(p => p.status === 'current') || []).length > 0 ? (
                  projects
                    .filter(p => p.status === 'current')
                    .map(project => (
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
                  <p className="col-span-2 ">No current projects found.</p>
                )}
              </div>

              <h2 className="text-3xl font-extrabold border-b border-gray-300 pb-2 mt-12">Completed Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {(projects?.filter(p => p.status === 'completed') || []).length > 0 ? (
                  projects
                    .filter(p => p.status === 'completed')
                    .map(project => (
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
                  <p className="col-span-2 ">No completed projects found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      }
      {showForm && (
        <div className="flex flex-col items-center justify-center w-full">
        <form
          onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-xl text-black w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>
          <label htmlFor="text">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <label htmlFor="text">Description</label>
          <textarea
            placeholder="Description"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <label htmlFor="date">Start Date</label>
          <input
            type="date"
            value={project.start}
            onChange={(e) => setProject({ ...project, start: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <label htmlFor="date">Start Time</label>
          <input
            type="time"
            value={project.starttime}
            onChange={(e) => setProject({ ...project, starttime: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          
          <label htmlFor="date">End Date</label>
          <input
            type="date"
            value={project.end}
            onChange={(e) => setProject({ ...project, end: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <label htmlFor="date">End Time</label>
          <input
            type="time"
            value={project.endtime}
            onChange={(e) => setProject({ ...project, endtime: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <label htmlFor="text">Select Status</label>
          <select
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          >
            <option value="">Status</option>
            <option value="completed">Completed Project</option>
            <option value="current">Current Project</option>
          </select>
          <label htmlFor="text">Select Priority</label>
          <select
            value={project.priority}
            onChange={(e) => setProject({ ...project, priority: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          >
            <option value="">Priority</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <label htmlFor="date">Deadline</label>
          <input
            type="date"
            value={project.deadline}
            onChange={(e) => setProject({ ...project, deadline: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />

            <div className="flex gap-3 mt-4">
              <button 
                type="submit" 
                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
        </form>
        </div>
      )}
    </div>
  )
}

export default Projects
