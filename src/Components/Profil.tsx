import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Profil() {
  const [isMenu, setIsMenu] = useState(false);
  const [onClick, setOnClick] = useState(false);

  const handleClick = () => {
    setOnClick(!onClick);
    setIsMenu(onClick);
  };
  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };
  return (
    <div className="flex flex-col  items-center">
      <button
        className="flex min-w-20 w-fih h-8 border-b-2 border-gray-600 mt-2 ml-2 mr-2 justify-center items-center pl-2 rounded-lg  bg-gray-50  text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="mr-2">
          <h1 className="text-sm ">Nikola</h1>
          {/* <p className="  text-xs text-gray-600">View profile</p> */}
        </div>
      </button>
      {isMenu ? (
        <div className="w-fit h-fit  justify-center items-center mt-14 fixed z-40">
          <div className=" flex justify-center items-center min-w-20 w-32 bg-gray-300 h-36 mb-10 mx-auto my-auto  text-black rounded-3xl ">
            <div className="flex flex-col justify-center items-center ">
              <button className="w-20 h-8 m-1 border-b-2 border-gray-600 bg-white rounded-2xl hover:bg-gray-400 transition duration-500 ease-in-out ">
                Settings
              </button>
              <button className="w-20 h-8 m-1 border-b-2 border-gray-600 bg-white rounded-2xl hover:bg-gray-400 transition duration-500 ease-in-out">
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profil;
