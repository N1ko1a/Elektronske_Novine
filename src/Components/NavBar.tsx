import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Prijava from "./Prijava";
import Registracija from "./Registracija";
import Profil from "./Profil";
import AddArtical from "./AddArtical";

function NavBar({ handleNavPage }) {
  const [search, setSearch] = useState("");
  const [isToken, setIsToken] = useState(false);
  const [nameLog, setIsNameLog] = useState("");
  const [nameReg, setIsNameReg] = useState("");
  const [change, setChange] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearch(searchText);
  };

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("Prisustvo_Tokena");
    if (data !== null) setIsToken(JSON.parse(data));

    const name = window.localStorage.getItem("Prijava_name");
    if (name !== null) setIsNameLog(JSON.parse(name));
  }, [isToken, nameLog]);

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

  const handleNameLog = (newNameLog) => {
    setIsNameLog(newNameLog);
  };

  const handleNameReg = (newNameReg) => {
    setIsNameReg(newNameReg);
  };
  const handleToken = (newIsToken) => {
    setIsToken(newIsToken);
  };

  const handleTokenReg = (newIsTokenReg) => {
    setIsToken(newIsTokenReg);
  };
  const handleTokenLogut = (newIsTokenLogout) => {
    setIsToken(newIsTokenLogout);
  };

  const buttonAll = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "");
  };

  const buttonOpste = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "general");
  };
  const buttonBiznis = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "business");
  };
  const buttonZabava = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "entertainment");
  };
  const buttonZdravlje = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "health");
  };
  const buttonNauka = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "science");
  };
  const buttonSport = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "sports");
  };
  const buttonTehnologija = () => {
    setChange(!change);
    handleNavPage(change);
    window.localStorage.setItem("Trenutna_strana", 0);
    window.localStorage.setItem("Rublika", "technology");
  };

  return (
    <div className="flex  flex-col justify-center items-center w-screen ">
      <Link to="/">
        <h1 className=" flex  justify-center font-semibold font-serif ease-in-out duration-500 m-5 text-4xl sm:text-5xl  md:text-7xl">
          NOVOSTI
        </h1>
      </Link>
      <div className="flex flex-wrap justify-evenly w-fit border-b-2 border-black ">
        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "" ? "font-bold" : "font-normal"}`}
          onClick={buttonAll}
        >
          ALL
        </button>

        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "general" ? "font-bold" : "font-normal"}`}
          onClick={buttonOpste}
        >
          GENERAL
        </button>
        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "business" ? "font-bold" : "font-normal"}`}
          onClick={buttonBiznis}
        >
          BUSINESS
        </button>
        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "entertainment" ? "font-bold" : "font-normal"}`}
          onClick={buttonZabava}
        >
          ENTERTAINMENT
        </button>
        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "health" ? "font-bold" : "font-normal"}`}
          onClick={buttonZdravlje}
        >
          HEALTH
        </button>
        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "science" ? "font-bold" : "font-normal"}`}
          onClick={buttonNauka}
        >
          SCIENCE
        </button>
        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "sports" ? "font-bold" : "font-normal"}`}
          onClick={buttonSport}
        >
          SPORTS
        </button>
        <button
          className={`m-2 text-xs hover:font-bold w-fit h-5 ease-in-out duration-500 sm:text-xs sm:m-3 sm:hover:text-base md:text-base md:hover:text-xl ${window.localStorage.getItem("Rublika") == "technology" ? "font-bold" : "font-normal"}`}
          onClick={buttonTehnologija}
        >
          TECHNOLOGY
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
          {isToken ? (
            <>
              <AddArtical />
              <Profil
                handleTokenLogut={handleTokenLogut}
                name={nameLog || nameReg}
              />
            </>
          ) : (
            <>
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
              {showSignIn ? (
                <Prijava
                  toggleSignIn={toggleSignIn}
                  handleToken={handleToken}
                  handleNameLog={handleNameLog}
                />
              ) : null}
              {showSignUp ? (
                <Registracija
                  toggleSignUp={toggleSignUp}
                  handleTokenReg={handleTokenReg}
                  handleNameReg={handleNameReg}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
