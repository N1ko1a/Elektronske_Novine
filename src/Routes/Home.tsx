// import Artical from "../Components/Artical";
import ArticalDisplay from "../Components/ArticalDisplay";
import NavBar from "../Components/NavBar";
import Ponovo from "../Components/Ponovo";
function Home() {
  return (
    <div className="flex flex-col justify-center">
      <NavBar />
      <ArticalDisplay />
      <Ponovo />
    </div>
  );
}

export default Home;
