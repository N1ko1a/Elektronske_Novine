import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function AddArticalPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
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

  useEffect(() => {
    // Load draft for the current user when component mounts
    loadDraftForUser();
  }, []);

  const handleAddArtical = async () => {
    try {
      // Send article data to the server
      const response = await fetch(`http://localhost:3000/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          author: author,
          content: content,
          image: files.map((file) => file.preview),
          category: selectedCategory,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If successfully sent, clear draft for the current user
        clearDraftForUser();
        navigate(`/`);
        console.log(data.message);
      } else {
        console.error("Failed to add the article:", data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  const toggleCategoryClick = () => {
    setCategoryClick(!categoryClick);
  };

  const handleCategoryClick = (chose: string) => {
    setSelectedCategory(chose);
    setCategoryClick(false);
  };

  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    const newFiles = Array.from(selectedFiles).map((file) => ({
      preview: URL.createObjectURL(file),
      base64: URL.createObjectURL(file),
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

  const handelContent = (event) => {
    setContent(event.target.value);
  };

  const loadDraftForUser = () => {
    // Load draft for the current user from localStorage
    const userName = window.localStorage.getItem("Prijava_name"); // Replace with actual user identifier
    const draftData = localStorage.getItem(`articleDraft_${userName}`);
    if (draftData) {
      const { title, author, content, files, selectedCategory } =
        JSON.parse(draftData);
      setTitle(title || "");
      setAuthor(author || "");
      setContent(content || "");
      setFiles(files || []);
      setSelectedCategory(selectedCategory || "");
    }
  };

  const saveDraftForUser = () => {
    // Save draft for the current user to localStorage
    const userName = window.localStorage.getItem("Prijava_name"); // Replace with actual user identifier
    const draft = {
      title,
      author,
      content,
      files,
      selectedCategory,
    };
    localStorage.setItem(`articleDraft_${userName}`, JSON.stringify(draft));
  };

  const clearDraftForUser = () => {
    // Clear draft for the current user from localStorage
    const userName = window.localStorage.getItem("Prijava_name"); // Replace with actual user identifier
    localStorage.removeItem(`articleDraft_${userName}`);
  };

  // Handle saving draft on component unmount
  useEffect(() => {
    window.addEventListener("beforeunload", saveDraftForUser);
    return () => {
      window.removeEventListener("beforeunload", saveDraftForUser);
    };
  }, [title, author, content, files, selectedCategory]);

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
            value={content}
            onChange={handelContent}
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
          <button
            className=" w-36 h-10 mt-5 mb-20 border-b-2 border-gray-600 text-center rounded-2xl bg-gray-50 outline-none text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
            onClick={handleAddArtical}
          >
            Send Artical
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddArticalPage;
