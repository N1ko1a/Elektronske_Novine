import { useState } from "react";
import Prijava from "./Prijava";
import Registracija from "./Registracija";

function NavBar() {
  const [search, setSearch] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearch(searchText);
  };

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const openSignIn = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(false);
  };
  const openSignUp = () => {
    setShowSignUp(!showSignUp);
    setShowSignIn(false);
  };
  const toggleSignIn = (value: boolean) => {
    setShowSignIn(value);
  };
  const toggleSignUp = (value: boolean) => {
    setShowSignUp(value);
  };

  return (
    <div className="flex  flex-col justify-center items-center w-screen ">
      <h1 className=" flex  justify-center font-semibold font-serif ease-in-out duration-500 m-5 text-4xl sm:text-5xl  md:text-7xl">
        NOVOSTI
      </h1>
      <div className="flex flex-wrap justify-evenly w-fit border-b-2 border-black ">
        <button className="m-2 text-xs  hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl">
          OPSTE
        </button>
        <button className="m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl">
          BIZNIS
        </button>
        <button className="m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl">
          ZABAVA
        </button>
        <button className="m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl">
          ZDRAVLJE
        </button>
        <button className="m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl">
          NAUKA
        </button>
        <button className="m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl">
          SPORT
        </button>
        <button className="m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base  md:text-base md:hover:text-xl">
          TEHNOLOGIJA
        </button>
      </div>
      <div className=" w700 flex justify-center ">
        <div className=" mb-2 mt-2 mr-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="text-sm w-48 h-8 bg-gray-50 border-b-2 border-gray-600 rounded-xl  outline-none text-black pl-4 hover:bg-gray-200   transition duration-500 ease-in-out hover:text-black sm:w-64 sm:text-sm md:text-base"
            onChange={handleInputChange} // Update search results as the user types
          />
        </div>
        <div className="flex flex-row w-fit">
          <button
            className="text-sm bg-gray-50 border-b-2 border-gray-600 h-8 w-24 md:w-28 mt-2 mb-2 rounded-xl hover:bg-gray-200 transition duration-500 ease-in-out drop-shadow-2xl sm:text-sm md:text-base"
            onClick={() => openSignUp()}
          >
            Registracija
          </button>
          <button
            className="text-sm bg-gray-50 border-b-2 border-gray-600 h-8 w-24 md:w-28 ml-2 mt-2 mb-2 rounded-xl hover:bg-gray-200 transition duration-500 ease-in-out sm:text-sm md:text-base"
            onClick={() => openSignIn()}
          >
            Prijava
          </button>
          {showSignIn ? <Prijava toggleSignIn={toggleSignIn} /> : null}
          {showSignUp ? <Registracija toggleSignUp={toggleSignUp} /> : null}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
