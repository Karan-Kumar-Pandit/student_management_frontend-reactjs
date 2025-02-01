import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import AddMemberModal from "./AddMemberModal";
import { fetchStudents, deleteStudent } from "../services/memberService";
import StudentMarksModal from "./StudentMarksModal";
import { toast } from "react-toastify";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [showModalMarks, setShowModalMarks] = useState(false);
  const [editStudentData, setEditStudentData] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await fetchStudents();
    setStudents(res.data);
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        await deleteStudent(studentId);
        toast.success("Student deleted successfully!", { position: "top-right" });
        loadStudents();
      } catch (error) {
        toast.error("Failed to delete student.", { position: "top-right" });
      }
    }
  };

  const passMarks = async (marksData) => {
    setMarks(marksData);
    setShowModalMarks(true);
  };

  const handleEdit = (student) => {
    setEditStudentData(student);
    setShowModal(true);
  };

  return (
    <>
      <div className="container mt-4">
        <h3>All Students</h3>
        <div className="d-flex justify-content-between mb-3">
          <SearchBar search={search} setSearch={setSearch} />
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Add New Student
          </button>
        </div>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Student PhoneNo</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.StudentId}>
                <td>{student.StudentId}</td>
                <td>{student.StudentName}</td>
                <td>{student.Email}</td>
                <td>{student.MobileNo}</td>
                <td>{student.Age}</td>
                <td>{student.Gender}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => passMarks(student)}>
                    <FaEye />
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(student)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(student.StudentId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} students={students} studentsPerPage={studentsPerPage} />

        <AddMemberModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          editStudentData={editStudentData}
          refreshStudents={() => loadStudents()}
        />

        <StudentMarksModal
          show={showModalMarks}
          handleClose={() => setShowModalMarks(false)}
          marksData={marks}
          refreshStudents={() => loadStudents()}
        />
      </div>
    </>
  );
};

export default StudentsTable;
