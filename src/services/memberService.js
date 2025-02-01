import axios from "axios";

const API_URL = "http://localhost:3500/student";

// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    return [];
  }
};

// Add a new student
export const addStudent = async (studentData) => {
  try {
    await axios.post(API_URL, studentData);
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

// Update an existing student (NEW)
export const updateStudent = async (id, updatedStudentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedStudentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    return null;
  }
};
