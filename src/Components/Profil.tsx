import profilna from "../assets/Cargo_Plane.png";
function Profil() {
  return (
    <button className="flex flex-col w-fih h-12 border-b-2 border-gray-600 mt-1 ml-2 mr-2 justify-center items-center pl-2 rounded-lg  bg-gray-50  text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-blackcursor-pointer">
      {/* <img */}
      {/*   src={profilna} */}
      {/*   alt="Profilna" */}
      {/*   className="w-10 h-10 rounded-3xl pt-1 object-cover" */}
      {/* /> */}
      <div className="mr-2">
        <h1 className="text-sm font-bold">Neski</h1>
        <p className="text-xs text-gray-600">View profile</p>
      </div>
    </button>
  );
}

export default Profil;
