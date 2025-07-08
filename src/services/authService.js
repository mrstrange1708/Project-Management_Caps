import config from '../config.js';

const BASE_URL = config.API_URL;

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Login failed:', data);
      throw new Error(data.message || 'Login failed');
    }
    
    if (!data.success || !data.data) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response from server');
    }
    
    // Store token and user data
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('userdata', JSON.stringify(data.data.user));
    
    console.log('Login successful:', data.data.user);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function registerUser(email, password, username) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Registration failed:', data);
      throw new Error(data.message || 'Registration failed');
    }
    
    if (!data.success || !data.data) {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response from server');
    }
    
    // Store token and user data after successful registration
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('userdata', JSON.stringify(data.data.user));
    
    console.log('Registration successful:', data.data.user);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userdata');
}

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  const userdata = localStorage.getItem('userdata');
  return !!(token && userdata);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUserData() {
  const userdata = localStorage.getItem('userdata');
  try {
    return userdata ? JSON.parse(userdata) : null;
  } catch {
    return null;
  }
} 