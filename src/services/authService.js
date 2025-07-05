// authService.js

const API_URL = 'http://localhost:3001/api/auth'; // Update if backend URL changes

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('userdata', JSON.stringify(data.user));
  return data;
}

export async function registerUser(email, password, username) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username })
  });
  if (!response.ok) throw new Error('Registration failed');
  const data = await response.json();
  return data;
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userdata');
} 