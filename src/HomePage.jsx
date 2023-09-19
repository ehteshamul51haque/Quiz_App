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
        <div className='back'>
            <div className="card">
               <h1 className="text-2xl font-semibold mb-4 font-satoshi text-center">Welcome to the Quiz App</h1>
          <p className="text-gray-600 mb-4 font-satoshi">Please enter your name and select a category to start the quiz</p>
          <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input type="text" id="name" value={name} onChange={ev=>setName(ev.target.value)} required className="mt-1 p-2 w-full border border-gray-400 focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select a Category:</label>
                <select id="category" value={selectedCategory} onChange={ev => setSelectedCategory(ev.target.value)} className="mt-1 p-2 w-full border border-gray-400 focus:outline-none focus:ring focus:border-blue-300">
                    <option value="">Select</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Marvel Cinematic Universe">MCU</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Science and Tech">Science and Tech</option>
                    <option value="World History">World History</option>
                </select>
                </div>
                <div className="text-center">
<button onClick={handleStartQuiz} className="bg-pink-light text-white py-2 px-4 rounded-md hover:bg-pink-dark transition duration-300">Start Quiz</button> 
                </div>
            
        </div>
          
    </div>
  )
}

export default HomePage
