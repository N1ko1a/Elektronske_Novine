import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from "react";
import slika from "../assets/vesti.jpeg";

type ArticalProp = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  // category: string;
  // url: string;
  // source: string;
  // author: string;
};

function Artical(props: ArticalProp) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const navigateToArtical = () => {
    navigate("ArticalPrev", { state: { id: props.id } });
  };
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const imageContainerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    paddingTop: "64%", // Adjust this value to control the aspect ratio
    overflow: "hidden",
    borderRadius: "15px",
  };

  const imageStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    objectFit: "cover",
    filter: imageLoaded ? "none" : "blur(8px)",
    transition: "filter 0.5s ease-in-out",
  };
  // Pretvaranje stringa datuma u JavaScript Date objekt
  const dateObject = new Date(props.date);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <button
      className="flex flex-col justify-center items-center max-w-72 min-h-60 max-h-fit rounded-lg text-black bg-gray-100 hover:bg-gray-200 ease-in-out duration-500 hover:text-black"
      onClick={navigateToArtical}
    >
      <div style={imageContainerStyle}>
        <img
          src={props.image || slika}
          alt="Autor nije prilozio sliku"
          loading="lazy"
          style={imageStyle}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="grid row-2 content-between max-w-72 h-full ml-5 mr-5 mt-2 font-bold  ">
        <h1 className="">{props.title}</h1>
        <h1 className=" mr-2 text-sm justify-self-end ">{`${formattedDate} ${formattedTime}`}</h1>
      </div>
    </button>
  );
}

export default Artical;
