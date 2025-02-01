import React from "react";
import MembersPage from "./pages/MembersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <MembersPage />
    </div>
  );
}

export default App;
