import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoutes from "./PrivateRoutes";
// import bg from "./assets/profileAndAuthBgvideo.mp4"
import EditList from "./pages/EditList";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

function App() {
  return (
    <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">

      <div className="">
      <Header />

      </div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/createlisting" element={<CreateListing />}></Route>
          <Route path="/editlist/:listId" element={<EditList />}></Route>
        </Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/listing/:listId" element={<Listing />}></Route>
        <Route path="/search" element={<Search />}></Route>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
