// import Artical from "../Components/Artical";
import { useState } from "react";
import ArticalDisplay from "../Components/ArticalDisplay";
import NavBar from "../Components/NavBar";
function Home() {
  const [page, setPage] = useState(false);
  const handleNavPage = (newValue) => {
    setPage(newValue);
  };
  console.log("Pars: ", page);
  return (
    <div className="flex flex-col justify-center">
      <NavBar handleNavPage={handleNavPage} />
      <ArticalDisplay page={page} />
    </div>
  );
}

export default Home;
