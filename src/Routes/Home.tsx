import Artical from "../Components/Artical";
import NavBar from "../Components/NavBar";

function Home() {
  return (
    <div className="flex flex-col justify-center">
      <NavBar />
      <Artical />
    </div>
  );
}

export default Home;
