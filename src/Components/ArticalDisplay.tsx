import { useEffect, useState } from "react";
import LoadSkeleton from "./LoadSkeleton";
import Artical from "./Artical";
import ReactPaginate from "react-paginate";

type ArticalType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
};

function ArticalDisplay() {
  const [artical, setArtical] = useState<ArticalType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const itemsPerPage = 12;
  const pageCount = Math.ceil(itemCount / itemsPerPage);
  console.log(artical);

  useEffect(() => {
    setIsLoading(true);
    const pageToFetch = currentPage;
    const apiURL = `http://localhost:3000/news?page=${pageToFetch}&itemCount=${itemsPerPage}`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const articalResults = data || []; // default to an empty array if results is undefine
        setItemCount(articalResults.totalArticles);
        setArtical(articalResults.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: Ne mogu da uzmem podatke", error);
        setIsLoading(false);
      });
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="felx-1 max-w-fit mx-auto p-10">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-14">
          {isLoading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <LoadSkeleton key={index} />
              ))
            : artical.map((artical) => (
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
      <div className="flex justify-center items-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "flex flex-row text-black justify-between items-center w-96 h-10 p-2"
          }
          activeClassName={"active"}
          previousClassName={
            "text-black hover:text-black ease-in-out duration-300"
          }
          nextClassName={"text-black hover:text-black ease-in-out duration-300"}
          pageClassName={"text-black hover:text-black ease-in-out duration-300"}
          breakClassName={""}
        />
      </div>
    </div>
  );
}

export default ArticalDisplay;
