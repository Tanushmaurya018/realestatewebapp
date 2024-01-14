import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import Header from "./components/Header";
import PrivateRoutes from "./PrivateRoutes";
import bg from "./assets/profileAndAuthBgvideo.mp4"
import EditList from "./pages/EditList";

function App() {
  return (
    <div>

      <div className="">
      <Header />

      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/createlisting" element={<CreateListing />}></Route>
          <Route path="/editlist/:listId" element={<EditList />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
