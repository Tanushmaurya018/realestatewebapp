import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const dispatch = useDispatch();

  return (
    <header className=" container mx-auto bg-gradient-to-r from-rose-100 to-teal-100 h-[70px] flex justify-between items-center p-3 gap-2">
      <Link to="/">
        <h1 className="text-lg md:text-3xl ">Real Estate</h1>
      </Link>

      <div className="flex justify-center items-center gap-1">
        <input
          type="text"
          className="w-[150px] md:w-[600px] h-[20px] md:h-[40px] p-4 rounded-full text-lg  md:text-xl items-center justify-center "
          placeholder="Search..."
        ></input>
        <button>
          <CiSearch className="bg-gray-200 rounded-full w-auto h-auto p-2 text-xl md:text-3xl hover:bg-white hover:text-black transition ease-in-out" />
        </button>
      </div>

      <ul className="flex items-center gap-5 text-2xl">
        <div className="hidden md:inline">
          <Link to="/about">
            <li className="">About</li>
          </Link>
        </div>
        {currentUser?.userWoPassword != null ? (
          <Link
            to="/profile"
            className="flex gap-2 items-center justify-center"
          >
            <div className="hidden md:inline">
              <h1> {currentUser.userWoPassword?.username}</h1>
            </div>
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={currentUser?.userWoPassword?.photoURL}
            ></img>
          </Link>
        ) : (
          <Link to="/login">
            {" "}
            <li className="font-Montserrat text-xl rounded-full hover:px-16 text-white bg-green-600 hover:bg-white hover:text-black transition-all ease-linear p-3">
              Log In
            </li>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
