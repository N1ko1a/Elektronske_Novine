import { useState, useEffect, useCallback } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import LoadSkeleton from "./LoadSkeleton";
import Artical from "./Artical";
import slika from "../assets/vesti.jpeg";
import { CSSProperties } from "react";
import Comment from "./Comment";
import CommentsDisplay from "./CommentsDisplay";
import { useNavigate } from "react-router-dom";

// import LoadingGame from "./LoadingGame";
type ArticalPageProp = {
  _id: number;
};
type Artical = {
  _id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  category: string;
  url: string;
  source: string;
  author: string;
  content: string;
  approved: boolean;
};
function ArticalPage(props: ArticalPageProp) {
  const navigate = useNavigate();

  const [artical, setArtical] = useState<Artical | null>(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDisplay, setIsLoadingDisplay] = useState(true);
  const [articalDisplay, setArticalDisplay] = useState<Artical[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [likedArtical, setLikedArtical] = useState(false);
  const [dislikedArtical, setDislikedArtical] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3000/news/${props._id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtical(data);
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [props, likedArtical, dislikedArtical]);
  useEffect(() => {
    const pageToFetch = 0;
    const itemsPerPage = 4;
    fetch(
      `http://localhost:3000/news?page=${pageToFetch}&itemCount=${itemsPerPage}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setArticalDisplay(data.articles);
        setIsLoadingDisplay(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoadingDisplay(false);
      });
  }, []);
  const refreshComments = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/news/${props._id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      } else {
        console.error("An error occurred while fetching comments");
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  }, [props._id]);
  const dateObject = artical ? new Date(artical.date) : null;
  const formattedDate = dateObject
    ? dateObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : null;

  const formattedTime = dateObject
    ? dateObject.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleApproval = async () => {
    try {
      const response = await fetch(`http://localhost:3000/news/${props._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          approved: true,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Approved");
        navigate(`/ApprovePage`);
      } else {
        console.error("Failed to approve:", data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  const handleLike = async (_id, articleId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/news/${props._id}/article/${articleId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // The browser will automatically include the cookie in the headers
          },
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setLikedArtical(!likedArtical);

        console.log(data.message);
      } else {
        console.error("Failed to like the article:", data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };
  const handleDislike = async (_id, articleId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/news/${props._id}/article/${articleId}/dislike`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // The browser will automatically include the cookie in the headers
          },
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setDislikedArtical(!dislikedArtical);
        console.log(data.message);
      } else {
        console.error("Failed to dislike the article:", data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  const imageContainerStyle: CSSProperties = {
    position: "relative",
    width: "70%",
    paddingTop: "40%", // Adjust this value to control the aspect ratio
    overflow: "hidden",
    borderRadius: "15px",
    margin: "0 auto",
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

  const authorDisplay =
    artical && artical.author !== null ? artical.author : "Unknown";

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center">
      <div className="min-h-screen min-w-screen flex flex-col items-center lg:flex-row">
        {isLoading ? (
          // Render loading state or component here
          <div>Loading...</div>
        ) : artical ? (
          // Render the article details if available
          <div className="flex flex-col  h-fit w-screen  lg:ml-44  p-5 lg:w-3/4 ease-in-out duration-300">
            <div>
              {" "}
              {artical.approved ? null : (
                <button
                  className=" w-40 h-10 mt-5 mb-2 border-b-2 border-gray-600 text-center rounded-2xl bg-gray-50 outline-none text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
                  onClick={handleApproval}
                >
                  APPROVE
                </button>
              )}
            </div>

            <div className="flex flex-wrap w-full h-fit text-5xl font-semibold">
              {artical.title}
            </div>
            <div className="flex mt-5 mb-5">
              {artical.source} | {`${formattedDate} ${formattedTime}`}
            </div>
            <div style={imageContainerStyle}>
              <img
                src={artical.image || slika}
                alt="Autor nije prilozio sliku"
                loading="lazy"
                style={imageStyle}
                onLoad={handleImageLoad}
              />
            </div>
            <div className="flex flex-wrap w-full h-fit text-lg mt-5 mb-5">
              {artical.content}
              <p className="mt-1">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32. The standard chunk of Lorem Ipsum used since
                the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                Cicero are also reproduced in their exact original form,
                accompanied by English versions from the 1914 translation by H.
                Rackham.
              </p>
              <p className="mt-1">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.
              </p>
            </div>
            <div className="flex justify-between w-11/12 mb-2 mt-2">
              <div className="flex w-fit">
                <div className="flex w-fit mr-3 justify-center items-center">
                  <p>{artical.like.length} </p>
                  <button
                    className="ml-1 mb-1  hover:text-xl "
                    onClick={() => handleLike(props._id, artical._id)}
                  >
                    <AiOutlineLike />
                  </button>
                </div>
                <div className="flex w-fit ml-3 justify-center items-center">
                  <p>{artical.dislike.length} </p>
                  <button
                    className="ml-1  hover:text-xl "
                    onClick={() => handleDislike(props._id, artical._id)}
                  >
                    <AiOutlineDislike />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">Author: {authorDisplay}</div>
            </div>
          </div>
        ) : (
          // Render an error message or handle the error case
          <div>Error loading article</div>
        )}
        <div className="flex  justify-center items-center  h-fit w-screen md:h-fit  lg:w-1/4 p-5">
          <div className="felx-1 w-fit mx-auto ">
            <div className="grid grid-rows-4  grid-flow-col gap-2 sm:grid-rows-2 md:grid-rows-1 lg:grid-rows-4     ">
              {isLoadingDisplay
                ? Array.from({ length: 5 }).map((_, index) => (
                    <LoadSkeleton key={index} />
                  ))
                : articalDisplay.map((artical) => (
                    <Artical
                      key={artical._id}
                      _id={artical._id}
                      image={artical.image}
                      title={artical.title}
                      description={artical.description}
                      date={artical.date}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-screen h-fit">
        <div className=" min-h-56 mb-5 mt-5 flex flex-col  h-fit w-screen  p-5 lg:w-4/6 lg:ml-44 ease-in-out duration-300">
          <Comment _id={props._id} refreshComments={refreshComments} />
        </div>
        {comments && comments.length ? (
          <div className="min-h-56 mb-5 mt-5 flex flex-col  h-fit w-screen  p-5 lg:w-4/6 lg:ml-44 ease-in-out duration-300">
            <CommentsDisplay
              comments={comments}
              _id={props._id}
              refreshComments={refreshComments}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ArticalPage;
