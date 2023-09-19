import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";


const QuizPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('name');
    const selectedCategory = queryParams.get('category');
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/src/questions.json');
                const data = await response.json();
                const categoryQuestions = data.categories.find((category) => category.name === selectedCategory);

                if (categoryQuestions) {
                    setQuestions(categoryQuestions.questions);
                }
                else {
                    console.error(`Category ${selectedCategory} not found`);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        if (selectedCategory) {
            fetchQuestions();
        }
    }, [selectedCategory]);

    const handleAnswerSubmit = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        if (isCorrect) {
            setScore(score + 1);
        }

        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: { selectedOption, isCorrect },
        });
    };
    const handleNextQuestion = () => {
                if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        else {
            navigate(`/results?name=${userName}&category=${selectedCategory}&score=${score}&total=${questions.length}`);
        }
    }
    const renderAnswerOptions = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return currentQuestion.options.map((option, index) => (
            <div key={index}>
                <label>
                    <input type="radio" name="answer" value={option} onChange={() => handleAnswerSubmit(option)}
                        checked={userAnswers[currentQuestionIndex]?.selectedOption === option}
                        className="form-radio  h-3.5 w-3.5 mr-1.5 text-center"
                    // disabled={userAnswers[currentQuestionIndex] !== undefined} 
                    />
                    {option}
                </label>
            </div>
        ));
    };
  return (
      <div className="back">
          <div className="card">
              <h2 className="text-2xl font-semibold font-satoshi mb-6 text-center">Hello, {userName}!<br/><span className=" text-xl">Let&apos;s start the {selectedCategory} quiz.</span> </h2>
          {questions.length > 0 && currentQuestionIndex < questions.length ? (
              <div>
                  <p className="text-lg mb-4">Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].text}</p>
                  {renderAnswerOptions()}
                      <div className="text-center">
                       <button onClick={handleNextQuestion} disabled={userAnswers[currentQuestionIndex] === undefined}
                      className={`py-2 px-4 rounded-md bg-pink-light text-white hover:bg-pink-dark transition duration-300 ${userAnswers[currentQuestionIndex] === undefined ? "opacity-50 cursor-not-allowed" : ""}`}>Next Question</button>   
                  </div>
                      
              </div>
          ) : (
                  <div>
                      <p className="text-lg">Congratulations, you&apos;ve completed the {selectedCategory} quiz.</p>
             </div>     
          )}
          </div>   
    </div>
  )
}

export default QuizPage
