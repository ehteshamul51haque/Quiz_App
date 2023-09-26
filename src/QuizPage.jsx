import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const QuizPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/src/questions.json");
        const data = await response.json();
        const categoryQuestions = data.categories.find(
          (cat) => cat.name === category
        );

        if (categoryQuestions) {
          setQuestions(categoryQuestions.questions);
        } else {
          console.error(`Category ${category} not found`);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [category]);

  const handleAnswerSubmit = (questionIndex, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);

    navigate(
      `/results?category=${category}&score=${totalScore}&total=${questions.length}`
    );
  };

  return (
    <div className="back">
      <div className="card">
              <h1 className="text-3xl font-semibold font-satoshi mb-4">{category} Quiz</h1>
              {questions.length > 0 && (
                  <div>
                      {questions.map((question, index) => (
                          <div key={index} className="mb-6">
                              <p className="text-xl mb-4">Question {index + 1}: {question.text}</p>
                              <div className="">
                                  {question.options.map((option, optionIndex) => (
                                      <div key={optionIndex}
                                          className={`bg-purple-300 mb-5 p-4 rounded-lg cursor-pointer transition duration-300 text-center ${
                                          userAnswers[index]===option ?"bg-pink-500 border border-black":"bg-purple-300 hover:bg-purple-400"
                                              }`}
                                          onClick={() => handleAnswerSubmit(index, option)}>
                                          {option}
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
                      <div className="text-center">
                          <button onClick={handleSubmitQuiz}
                              className="py-2 px-4 rounded-md bg-pink-light text-white hover:bg-pink-dark transition duration-300">
                              Submit Quiz
                          </button>
                      </div>
                  </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
