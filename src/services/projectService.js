import config from '../config.js';
const BASE_URL = config.API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found in localStorage');
  }
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

function handleUnauthorized() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('userdata');
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  }
}

export async function fetchProjects() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/api/projects/`, {
      headers: getAuthHeaders()
    });
    
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Authentication failed. Please login again.');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Fetch projects failed:', response.status, errorData);
      throw new Error(`Failed to fetch projects: ${response.status} ${errorData.message || ''}`);
    }
    
    const data = await response.json();
    console.log('Projects fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchProjects:', error);
    throw error;
  }
}

export async function createProject(project) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Format dates to match backend expectations
    const formattedProject = {
      ...project,
      start: new Date(project.start).toISOString(),
      end: new Date(project.end).toISOString(),
      deadline: new Date(project.deadline).toISOString(),
      // Ensure required fields are present
      userId: JSON.parse(localStorage.getItem('userdata'))?.id,
      status: project.status || 'current',
      priority: project.priority || 'Medium',
      // Add default values for optional fields if not provided
      starttime: project.starttime || '09:00',
      endtime: project.endtime || '17:00'
    };

    console.log('Creating project with payload:', formattedProject);
    const response = await fetch(`${BASE_URL}/api/projects/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(formattedProject)
    });
    
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Authentication failed. Please login again.');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Create project failed:', response.status, errorData);
      throw new Error(`Failed to create project: ${response.status} ${errorData.message || 'Validation error'}`);
    }
    
    const data = await response.json();
    console.log('Project created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createProject:', error);
    throw error;
  }
}

export async function updateProject(id, updates) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Format dates if they are being updated
    const formattedUpdates = {
      ...updates,
      ...(updates.start && { start: new Date(updates.start).toISOString() }),
      ...(updates.end && { end: new Date(updates.end).toISOString() }),
      ...(updates.deadline && { deadline: new Date(updates.deadline).toISOString() })
    };

    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formattedUpdates)
    });
    
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Authentication failed. Please login again.');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Update project failed:', response.status, errorData);
      throw new Error(`Failed to update project: ${response.status} ${errorData.message || ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in updateProject:', error);
    throw error;
  }
}

export async function deleteProject(id) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Authentication failed. Please login again.');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Delete project failed:', response.status, errorData);
      throw new Error(`Failed to delete project: ${response.status} ${errorData.message || ''}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in deleteProject:', error);
    throw error;
  }
} 