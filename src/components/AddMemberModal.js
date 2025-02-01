import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddStudentModal = ({ show, handleClose, refreshStudents, editStudentData }) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [formData, setFormData] = useState({
    StudentName: "",
    Email: "",
    MobileNo: "",
    Age: null,
    Gender: "",
  });

  // Function to reset form fields
  const resetFormData = () => {
    setFormData({
      StudentName: "",
      Email: "",
      MobileNo: "",
      Age: null,
      Gender: "",
    });
  };

  useEffect(() => {
    if (editStudentData) {
      setFormData({
        StudentName: editStudentData.StudentName || "",
        Email: editStudentData.Email || "",
        MobileNo: editStudentData.MobileNo || "",
        Age: editStudentData.Age || "",
        Gender: editStudentData.Gender || "",
      });
      setUpdateFlag(true);
    }
  }, [editStudentData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Age" ? Number(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (updateFlag) {
        // Update Student (PUT Request)
        await axios.put(`http://localhost:3500/student/${editStudentData.StudentId}`, formData);
        setResponseMessage("Student updated successfully!");
      } else {
        // Create New Student (POST Request)
        await axios.post("http://localhost:3500/student", formData);
        setResponseMessage("Student added successfully!");
      }

      refreshStudents(); // Refresh the student list after operation
      handleCloseModal(); // Close modal after success
    } catch (error) {
      setResponseMessage("An error occurred while submitting the form123.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    resetFormData();
    handleClose(); // Close the modal
    setUpdateFlag(false);
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{updateFlag ? "Edit Student" : "Add New Student"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              name="StudentName"
              value={formData.StudentName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile No:</Form.Label>
            <Form.Control
              type="text"
              name="MobileNo"
              value={formData.MobileNo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="Gender" value={formData.Gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="btn btn-success mt-3 w-100" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : updateFlag ? "Update Student" : "Add Student"}
          </Button>
        </form>

        {responseMessage && <p className="mt-3 text-center">{responseMessage}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default AddStudentModal;
