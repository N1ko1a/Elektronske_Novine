import { useEffect, useState } from "react";
import LoadSkeleton from "./LoadSkeleton";
import Artical from "./Artical";
import ReactPaginate from "react-paginate";

type ArticalType = {
  id: number;
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
  const itemsPerPage = 20;
  const pageCount = Math.ceil(itemCount / itemsPerPage);
  console.log(artical);

  useEffect(() => {
    setIsLoading(true);
    const pageToFetch = currentPage + 1;
    const apiURL = `http://localhost:3000/news`;
    // const apiURL = `http://localhost:8080/games?page=${pageToFetch}&pageSize=${itemsPerPage}&search=${searchValue}&platform=${platformFilter}&store=${storeFilter}&genre=${
    //   genreFilterSearch || genreFilter
    // }&rating=${ratingFilter}&age=${selectedAge}&sort=${selectedSort}&sign=${sign}`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const articalResults = data || []; // default to an empty array if results is undefine
        console.log(articalResults);
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
    <div>
      <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-10 mt-5 mr-20 ml-20 justify-center items-center overflow-hidden">
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <LoadSkeleton key={index} />
            ))
          : artical.map((artical) => (
              <Artical
                key={artical.id}
                id={artical.id}
                image={artical.image}
                title={artical.title}
                description={artical.description}
                date={artical.date}
              />
            ))}
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
