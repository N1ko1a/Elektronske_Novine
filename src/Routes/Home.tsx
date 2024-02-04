// import Artical from "../Components/Artical";
import { useEffect, useState } from "react";
import ArticalDisplay from "../Components/ArticalDisplay";
import NavBar from "../Components/NavBar";
function Home() {
  const [page, setPage] = useState(false);
  const [search, setSearch] = useState("");
  const handleNavPage = (newValue) => {
    setPage(newValue);
  };
  const handleNavSearch = (newValue) => {
    setSearch(newValue);
  };
  console.log("Pars: ", page);
  return (
    <div className="flex flex-col justify-center">
      <NavBar handleNavPage={handleNavPage} handleNavSearch={handleNavSearch} />
      <ArticalDisplay page={page} search={search} />
    </div>
  );
}

export default Home;
