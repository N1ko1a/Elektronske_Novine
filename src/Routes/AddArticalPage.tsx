import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
function AddArticalPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const [categoryClick, setCategoryClick] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const toggleCategoryClick = () => {
    setCategoryClick(!categoryClick);
  };

  const handleCategoryClick = (chose: string) => {
    setSelectedCategory(chose);
    setCategoryClick(false);
  };
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handelComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="w-screen h-fit">
        <h1 className="flex justify-center font-semibold font-serif ease-in-out duration-500 m-5 text-4xl sm:text-5xl md:text-7xl">
          Add Article
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-11/12 rounded-xl h-fit bg-gray-200 mb-20">
        <div className="flex flex-col justify-start w-11/12 mb-2 mt-2">
          <h1 className="mb-2 mt-2">Title:</h1>
          <textarea
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="flex w-full h-10 justify-self-start text-black rounded-xl bg-gray-50 border-b-2 border-gray-600 p-2 outline-none hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
          />
        </div>
        <div className="flex flex-col justify-center w-11/12">
          <h1 className="mb-2 mt-2">Content:</h1>
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={handelComment}
            className="w-full h-32 p-4 text-black rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none hover:bg-gray-300 transition duration-500 ease-in-out"
          />
        </div>
        <div className="flex flex-col justify-center w-11/12">
          <h1 className="mb-2 mt-2">Add Image:</h1>
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            className="w-fit h-fit p-4 text-black rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none hover:cursor-pointer transition duration-500 ease-in-out"
          />
          <div className="flex flex-wrap justify-center items-center">
            {files.map((image, index) => (
              <div key={index} className="mr-2 mb-2">
                <img
                  src={image.preview}
                  alt={`preview-${index}`}
                  className="mb-2 mt-2 rounded-xl"
                  style={{
                    width: "300px", // Set the desired width
                    height: "200px", // Set the desired height
                    objectFit: "cover",
                  }}
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="text-sm bg-gray-50 border-b-2 border-gray-600 h-8 w-24 md:w-28 ml-2 mt-2 mb-2 rounded-xl hover:bg-gray-300 transition duration-500 ease-in-out sm:text-sm md:text-base"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-start w-11/12 mb-2 mt-2 ">
          <h1 className="mb-2 mt-2">Category:</h1>
          <button
            onClick={toggleCategoryClick}
            className="bg-gray-50  w-44 h-7 p-4 flex items-center justify-between  text-l text-black rounded-lg tracking-wider border-gray-600 border-b-2  active:text-black active:border-white hover:bg-gray-300 transition duration-500 ease-in-out"
          >
            {selectedCategory || "Category"}{" "}
            {categoryClick ? (
              <AiOutlineCaretUp className="transition: 0,3" />
            ) : (
              <AiOutlineCaretDown />
            )}
          </button>
          <AnimatePresence>
            {/*conditional rendering if generClick is true the expresion will be shown if its false it will not be shown*/}
            {categoryClick && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-300 absolute mt-24 z-40 w-44 rounded-lg flex flex-col items-center text-black font-medium text-l"
              >
                {/* IteratsetPlatformgh the list and outputting them */}
                {category.map((itemg) => (
                  <div
                    onClick={() => {
                      handleCategoryClick(itemg);
                    }}
                  >
                    <p className="cursor-pointer hover:text-white duration-300 text-l font-medium">
                      {itemg}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-start w-11/12 mb-2 mt-2">
          <h1 className="mb-2 mt-2">Author:</h1>
          <textarea
            type="text"
            placeholder="Author"
            value={author}
            onChange={handleAuthorChange}
            className="flex w-full  sm:w-96 h-10 justify-self-start text-black rounded-xl bg-gray-50 border-b-2 border-gray-600 p-2 outline-none hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
          />
        </div>
        <div className="flex flex-col justify-start w-11/12 mb-2 mt-2">
          <button className=" w-36 h-10 mt-5 mb-20 border-b-2 border-gray-600 text-center rounded-2xl bg-gray-50 outline-none text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black">
            Send Artical
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddArticalPage;
