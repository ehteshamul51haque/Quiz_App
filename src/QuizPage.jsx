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

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        else {
            navigate(`/results?name=${userName}&category=${selectedCategory}&score=${score}&total=${questions.length}`);
        }
    };
    const renderAnswerOptions = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return currentQuestion.options.map((option, index) => (
            <div key={index}>
                <label>
                    <input type="radio" name="answer" value={option} onChange={() => handleAnswerSubmit(option)}
                        disabled={userAnswers[currentQuestionIndex] !== undefined} />
                    {option}
                </label>
            </div>
        ));
    };
  return (
    <div className="quiz-page">
          <h2>Hello, {userName}! Let's start the {selectedCategory} quiz.</h2>
          {questions.length > 0 && currentQuestionIndex < questions.length ? (
              <div>
                  <p>Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].text}</p>
                  {renderAnswerOptions()}
                  {userAnswers[currentQuestionIndex] !== undefined && (
                      <p>{userAnswers[currentQuestionIndex].isCorrect ? 'Correct' : 'Incorrect'}</p>
                  )}
              </div>
          ) : (
                  <div>
                      <p>Congratulations, you've completed the {selectedCategory} quiz.</p>
                      {/* <button onClick={()=>navigate(`/results?name=${userName}&category=${selectedCategory}&score=${score}`)}>Check Result</button> */}
             </div>     
          )}
    </div>
  )
}

export default QuizPage
