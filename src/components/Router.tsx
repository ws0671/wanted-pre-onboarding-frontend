import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import SignUp from "../routes/SignUp";
import SignIn from "../routes/SignIn";
import ToDo from "../routes/ToDo";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
