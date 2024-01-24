import ArticalPage from "../Components/ArticalPage";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";

function ArticalPrev() {
  const { _id } = useLocation().state;

  return (
    <div>
      <NavBar />
      <ArticalPage _id={_id} />
    </div>
  );
}

export default ArticalPrev;
