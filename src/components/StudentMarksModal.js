import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const StudentMarksModal = ({ show, handleClose, refreshStudents, marksData }) => {

  const [formData, setFormData] = useState({
    StudentId: 0,
    Subject: "",
    MarksObtained: 0
  });

  useEffect(() => {
    if (marksData) {
      setFormData({
        StudentId: marksData.StudentId || ""
      });
    }
  }, [marksData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "MarksObtained" ? Number(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:3500/mark", formData);
      refreshStudents();
      handleClose();
      resetFormData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const resetFormData = () => {
    setFormData({
      StudentName: "",
      EmadentId: 0,
      Subject: "",
      MarksObtained: 0
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Marks add for {marksData ? marksData.StudentName : ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="Subject"
                value={formData.Subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3 col">
              <Form.Label>Marks Obtained</Form.Label>
              <Form.Control
                type="number"
                name="MarksObtained"
                value={formData.MarksObtained}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" className="btn btn-success mt-4 w-100 col add-marks">
              Add
            </Button>
          </div>
        </form>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Subject</th>
              <th>Marks Obtained</th>
            </tr>
          </thead>
          <tbody>
            {marksData && marksData.marks.map((mark, index) => (
              <tr key={index}>
                <td>{mark.Subject}</td>
                <td>{mark.MarksObtained}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default StudentMarksModal;
