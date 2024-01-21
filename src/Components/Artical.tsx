import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from "react";

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

  return (
    <button
      className="ml-20 flex flex-col justify-start items-center w-72 min-h-60 max-h-fit rounded-lg text-black bg-gray-100 hover:bg-gray-200 ease-in-out duration-500 hover:text-black"
      onClick={navigateToArtical}
    >
      <div style={imageContainerStyle}>
        <img
          src={props.image}
          alt="Game image"
          loading="lazy"
          style={imageStyle}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="flex flex-col flex-wrap w-72 h-fit ml-5 mr-5 mt-2 font-bold items-start ">
        <h1 className="">{props.title}</h1>
        <h1 className="ml-auto mr-2 text-sm">{props.date}</h1>
      </div>
    </button>
  );
}

export default Artical;
