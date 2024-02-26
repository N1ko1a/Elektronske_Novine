import ArticalApprovalDisplay from "../Components/ArticalApprovalDisplay";
import { useNavigate } from "react-router-dom";

function ApprovePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="w-screen h-fit">
        <h1 className="flex justify-center font-semibold font-serif ease-in-out duration-500 m-5 text-4xl sm:text-5xl md:text-7xl">
          Approve
        </h1>
        <div className="flex w-screen justify-center">
          <button
            className=" bg-gray-50 border-b-2 border-gray-600 h-8 w-28  ml-2 mt-2 mb-2 rounded-xl hover:bg-gray-200 transition duration-500 ease-in-out "
            onClick={handleBack}
          >
            Go Back
          </button>
        </div>
        <div>
          <ArticalApprovalDisplay />
        </div>
      </div>
    </div>
  );
}

export default ApprovePage;
