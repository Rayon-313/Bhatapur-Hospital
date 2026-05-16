// src/lib/api/admin.js
const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";

const API_BASE = `${backendUrl}/api/admin`;

// Admin login
export async function adminLogin(username, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to login:", err);
    throw err;
  }
}

// Register new admin (for initial setup)
export async function registerAdmin(username, password) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to register admin:", err);
    throw err;
  }
}