import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
function CommentsDisplay({ comments }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-gray-300 w-full min-h-48 h-fit p-2">
      {comments.map((comment) => (
        <div
          key={comment.commentId}
          className="flex flex-col w-full min-h-48 h-fit items-center justify-center m-4 p-2"
        >
          <div className="flex justify-start bg-gray-50 w-11/12 min-h-32 rounded-xl h-fit mb-2 mt-2 p-2">
            <p>{comment.content}</p>
          </div>
          <div className="flex justify-between w-11/12 mb-2 mt-2">
            <div className="flex w-fit">
              <div className="flex w-fit mr-3 justify-center items-center">
                <p>{comment.like} </p>
                <button className="ml-1 mb-1  hover:text-xl ">
                  <AiOutlineLike />
                </button>
              </div>
              <div className="flex w-fit ml-3 justify-center items-center">
                <p>{comment.dislike} </p>
                <button className="ml-1  hover:text-xl">
                  <AiOutlineDislike />
                </button>
              </div>
            </div>
            <p>{comment.user}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsDisplay;
