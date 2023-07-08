import React from "react";
import "./App.css";

import Login from "./components/Login/Login";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";

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
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
