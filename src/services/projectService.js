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

    const payload = {
      title: project.title,
      description: project.description,
      priority: project.priority || 'Medium',
      status: project.status || 'current',
      start: new Date(project.start).toISOString(),
      starttime: project.starttime || '09:00',
      end: new Date(project.end).toISOString(),
      endtime: project.endtime || '17:00',
      deadline: (project.deadline || '').split('T')[0], 
      userEmail: project.userEmail
    };

    console.log('Creating project with payload:', payload);
    const response = await fetch(`${BASE_URL}/api/projects/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
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

    const payload = {
      title: updates.title,
      description: updates.description,
      priority: updates.priority || 'Medium',
      status: updates.status || 'current',
      start: new Date(updates.start).toISOString(),
      starttime: updates.starttime || '09:00',
      end: new Date(updates.end).toISOString(),
      endtime: updates.endtime || '17:00',
      deadline: (updates.deadline || '').split('T')[0], 
      userEmail: updates.userEmail
    };

    const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
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