import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const userName = queryParams.get("name");
  const selectedCategory = queryParams.get("category");
  const score = queryParams.get("score");
  const total = queryParams.get("total");
  const navigate = useNavigate();
  return (
    <div className="back text-center">
     
      <div className=" card">
        <h2 className="text-4xl font-bold mb-4 font-satoshi ">Quiz Results</h2>
        <p className="text-3xl text-center mb-4 font-satoshi">
          Congratulations! You&apos;ve completed the {selectedCategory} quiz.
        </p>
        <p className="text-lg mb-4">
          Your final score is: {score} out of {total}
        </p>

        <button
          onClick={() => navigate("/")}
          className=" bg-pink-light text-white py-2 px-4 rounded-md hover:bg-pink-dark transition duration-300"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
