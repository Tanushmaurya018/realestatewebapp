import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home" ;
import Login from "./pages/Login" ;
import Signup from "./pages/Signup" ;
import About from "./pages/About" ;
import Profile from "./pages/Profile" ;

function App() {
  return (
    <>
<Routes>
<Route path="/" element={<Home/>}></Route>
<Route path="login" element={<Login/>}></Route>
<Route path="signup" element={<Signup/>}></Route>
<Route path="about" element={<About/>}></Route>
<Route path="profile" element={<Profile/>}></Route>
</Routes>
    </>
  );
}

export default App;
