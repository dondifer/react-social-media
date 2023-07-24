import React from "react";
import "./App.css";

import Login from "./components/Login/Login";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import AddNew from "./components/AddNew/AddNew";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="default-padding">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-new" element={<AddNew />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
