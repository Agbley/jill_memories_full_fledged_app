import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={user ? <Navigate to="/posts" /> : <Auth />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
export default App;
