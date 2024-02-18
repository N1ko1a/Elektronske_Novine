import { useEffect, useState } from "react";
import Settings from "./Settings";

const Profil = ({ handleTokenLogut, name }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [nameLog, setNameLog] = useState(name);
  const [openSettings, setOpenSettings] = useState(false);
  const [changeSettings, setChangeSettings] = useState(false);
  const handleClose = (value) => {
    setOpenSettings(value);
  };
  const toggleSettings = () => {
    setOpenSettings(!openSettings);
    setIsMenu(false);
  };
  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };
  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        window.localStorage.setItem("Prisustvo_Tokena", JSON.stringify(false));
        window.localStorage.setItem("Registracija_name", JSON.stringify(""));
        window.localStorage.setItem("Prijava_name", JSON.stringify(""));
        handleTokenLogut(false);
      } else {
        console.error("Failed to log in:", data.message);
        handleTokenLogut(true);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };
  const handleChangeSettings = (value) => {
    setChangeSettings(value);
  };

  return (
    <div className="flex flex-col  items-center">
      <button
        className="flex min-w-20 w-fih h-8 border-b-2 border-gray-600 mt-2 ml-2 mr-2 justify-center items-center pl-2 rounded-lg  bg-gray-50  text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="mr-2">
          <h1 className="text-sm sm:text-sm md:text-base">{nameLog}</h1>
          {/* <p className="  text-xs text-gray-600">View profile</p> */}
        </div>
      </button>
      {isMenu ? (
        <div className="w-fit h-fit  justify-center items-center mt-14 fixed z-40">
          <div className=" flex justify-center items-center min-w-20 w-32 bg-gray-300 h-36 mb-10 mx-auto my-auto  text-black rounded-3xl ">
            <div className="flex flex-col justify-center items-center ">
              <button
                className="w-20 h-8 m-1 border-b-2 border-gray-600 bg-white rounded-2xl hover:bg-gray-400 transition duration-500 ease-in-out "
                onClick={toggleSettings}
              >
                Settings
              </button>
              <button
                className="w-20 h-8 m-1 border-b-2 border-gray-600 bg-white rounded-2xl hover:bg-gray-400 transition duration-500 ease-in-out"
                onClick={handleButtonClick}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {openSettings ? (
        <Settings
          handleClose={handleClose}
          handleChangeSettings={handleChangeSettings}
        />
      ) : null}
    </div>
  );
};

export default Profil;
