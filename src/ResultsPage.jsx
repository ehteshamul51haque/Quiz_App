import { useLocation, useNavigate } from "react-router-dom"

const ResultsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('name');
    const selectedCategory = queryParams.get('category');
    const score = queryParams.get('score');
    const total = queryParams.get('total');
    const navigate = useNavigate();
    return (
    <div>
            <h2>Quiz Results</h2>
            <p>Congratulations {userName}! You've completed the {selectedCategory} quiz.</p>
            <p>Your final score is: {score} out of {total}</p>
            <button onClick={()=>navigate('/')}>Return to Homepage</button>
    </div>
  )
}

export default ResultsPage
