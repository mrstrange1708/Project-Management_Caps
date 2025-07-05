// projectService.js

const API_URL = 'http://localhost:3001/api/projects'; // Update if backend URL changes

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function fetchProjects() {
  const response = await fetch(`${API_URL}/`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function createProject(project) {
  const response = await fetch(`${API_URL}/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(project)
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}

export async function updateProject(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
}

export async function deleteProject(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
} 