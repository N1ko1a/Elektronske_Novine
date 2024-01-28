import { useState } from "react";

function Comment() {
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");

  const handelUserName = (event) => {
    setUserName(event.target.value);
  };
  const handelComment = (event) => {
    setComment(event.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center rounded-xl  bg-gray-300 w-full min-h-48 h-fit p-2">
      <div className="flex justify-start w-11/12  mb-2 mt-2">
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={handelUserName}
          className="flex w-fit min-w-1/3 h-8  justify-self-start text-black rounded-xl bg-gray-50 border-b-2 border-gray-600 p-2 outline-none  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black"
        />
      </div>
      <div className="flex justify-center w-11/12  ">
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={handelComment}
          className="w-full h-32 p-4 text-black rounded-2xl bg-gray-50 border-b-2 border-gray-600 outline-none  hover:bg-gray-300 transition duration-500 ease-in-out "
        />
      </div>

      <div className="flex justify-end w-11/12 mb-2 mt-2  ">
        <button className="flex w-24 h-8 justify-center items-center  text-center rounded-xl bg-gray-50 border-b-2 border-gray-600  text-black  hover:bg-gray-300 transition duration-500 ease-in-out hover:text-black ">
          Comment
        </button>
      </div>
    </div>
  );
}

export default Comment;
