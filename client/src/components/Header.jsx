import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();

  return (
    <header className="container mx-auto bg-gray-300 h-[70px] flex justify-between items-center p-3 gap-2">
      <Link to="/">
        <h1 className="text-lg md:text-3xl ">Real Estate</h1>
      </Link>

      <div className="flex justify-center items-center gap-1">
        <input
          type="text"
          className="w-[150px] md:w-[800px] h-[20px] md:h-[40px] p-4 rounded-full text-lg  md:text-xl items-center justify-center "
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
        {user?.currentUser ? (
          <div>{user.currentUser.userWoPassword.username}</div>
        ) : (
          <Link to="/login">
            {" "}
            <li className="text-lg md:text-2xl rounded-full bg-blue-900 px-3 md:px-4 py-1 text-white">
              Log In
            </li>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
