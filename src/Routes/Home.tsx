// import Artical from "../Components/Artical";
import ArticalDisplay from "../Components/ArticalDisplay";
import NavBar from "../Components/NavBar";

function Home() {
  return (
    <div className="flex flex-col justify-center">
      <NavBar />
      <ArticalDisplay />
    </div>
  );
}

export default Home;
