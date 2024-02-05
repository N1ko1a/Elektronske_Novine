import ArticalApprovalDisplay from "../Components/ArticalApprovalDisplay";

function ApprovePage() {
  return (
    <div>
      <div className="w-screen h-fit">
        <h1 className="flex justify-center font-semibold font-serif ease-in-out duration-500 m-5 text-4xl sm:text-5xl md:text-7xl">
          Approve
        </h1>
        <div>
          <ArticalApprovalDisplay />
        </div>
      </div>
    </div>
  );
}

export default ApprovePage;
