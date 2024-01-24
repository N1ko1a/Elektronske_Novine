import ArticalPage from "../Components/ArticalPage";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
function ArticalPrev() {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <NavBar />
      <ArticalPage _id={id} />
    </div>
  );
}

export default ArticalPrev;
