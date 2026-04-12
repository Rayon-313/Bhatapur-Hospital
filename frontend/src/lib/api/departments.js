// API client for departments
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/departments';

// Get all departments
export const getDepartments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

// Create a new department
export const createDepartment = async (departmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(departmentData),
    });
    if (!response.ok) throw new Error(`Create failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

// Update a department (Used for editing and status toggling)
export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(departmentData),
    });
    if (!response.ok) throw new Error(`Update failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error updating department:', error);
    throw error;
  }
};

// Delete a department
export const deleteDepartment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
};