import { useState } from "react"
import {useNavigate} from "react-router-dom"
const HomePage = () => {
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const handleStartQuiz = () => {
        if (name.trim() === '' || selectedCategory === '') {
            alert('Please enter your name and select a category to start the quiz');
            return;
        }
        navigate(`/quiz?name=${encodeURIComponent(name)}&category=${encodeURIComponent(selectedCategory)}`);
    };
    return (
    <div className='home-page'>
          <h1>Welcome to the Quiz App</h1>
          <p>Please enter your name and select a category to start the quiz</p>
          <div className="input-container">
              <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={ev=>setName(ev.target.value)} required />
            </div>
            <div className="input-container">
                <label htmlFor="category">Select a Category:</label>
                <select id="category" value={selectedCategory} onChange={ev => setSelectedCategory(ev.target.value)}>
                    <option value="">Select</option>
                    <option value="Cricket">Cricket</option>
                    <option value="MCU">MCU</option>
                    <option value="Bollywood">Bollywood</option>
                </select>
            </div>
            <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  )
}

export default HomePage
