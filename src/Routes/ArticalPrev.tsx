import ArticalPage from "../Components/ArticalPage";
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
function ArticalPrev() {
  const { id } = useParams();

  const [page, setPage] = useState(false);
  const [search, setSearch] = useState("");
  const handleNavPage = (newValue) => {
    setPage(newValue);
  };
  const handleNavSearch = (newValue) => {
    setSearch(newValue);
  };
  console.log(id);

  return (
    <div>
      <NavBar handleNavPage={handleNavPage} handleNavSearch={handleNavSearch} />
      <ArticalPage _id={id} />
    </div>
  );
}

export default ArticalPrev;
