import { useState } from "react";

function NavBar() {
  const [search, setSearch] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearch(searchText);
  };
  return (
    <div className="flex  flex-col justify-center items-center w-screen ">
      <h1 className=" flex  justify-center font-semibold font-serif ease-in-out duration-500 m-5 text-4xl sm:text-5xl  md:text-7xl">
        The Newspaper
      </h1>
      <div className="flex justify-evenly w-fit border-b-2 border-black">
        <button className="m-3  hover:font-bold w-fit h-10 ease-in-out duration-500 sm:text-xs sm:hover:text-base md:text-base md:hover:text-xl">
          GENERAL
        </button>
        <button className="m-3  hover:font-bold w-fit h-10 ease-in-out duration-500 sm:text-xs sm:hover:text-base md:text-base md:hover:text-xl">
          BUSINESS
        </button>
        <button className="m-3  hover:font-bold w-fit h-10 ease-in-out duration-500 sm:text-xs sm:hover:text-base md:text-base md:hover:text-xl">
          ENTERTAINMENT
        </button>
        <button className="m-3  hover:font-bold w-fit h-10 ease-in-out duration-500 sm:text-xs sm:hover:text-base md:text-base md:hover:text-xl">
          HEALTH
        </button>
        <button className="m-3  hover:font-bold w-fit h-10 ease-in-out duration-500 sm:text-xs sm:hover:text-base md:text-base md:hover:text-xl">
          SCIENCE
        </button>
        <button className="m-3  hover:font-bold w-fit h-10 ease-in-out duration-500 sm:text-xs sm:hover:text-base md:text-base md:hover:text-xl">
          SPORTS
        </button>
        <button className="m-3  hover:font-bold w-fit h-10 ease-in-out duration-500 sm:text-xs sm:hover:text-base  md:text-base md:hover:text-xl">
          TECHNOLOGY
        </button>
      </div>
      <div className=" w700 flex justify-center ">
        <div className="m-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="w-64 h-8 bg-gray-50 border-b-2 border-gray-600 rounded-xl  outline-none text-white pl-4 hover:bg-gray-200   transition duration-500 ease-in-out hover:text-black"
            onChange={handleInputChange} // Update search results as the user types
          />
        </div>
        <div className="">
          <button className="bg-gray-50 border-b-2 border-gray-600 h-8 w-20 m-2 rounded-xl hover:bg-gray-200 transition duration-500 ease-in-out drop-shadow-2xl">
            Sign in
          </button>
          <button className="bg-gray-50 border-b-2 border-gray-600 h-8 w-20 m-2 rounded-xl hover:bg-gray-200 transition duration-500 ease-in-out">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
