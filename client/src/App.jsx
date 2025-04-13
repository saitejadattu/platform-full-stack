import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgetPassword";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route
          path="*"
          element={
            <div className="h-screen flex justify-center items-center bg-grey-300">
              <p>Page Not Found</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
