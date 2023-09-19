import './App.css'
import { Route,Routes } from 'react-router-dom'
import HomePage from './HomePage'
import QuizPage from './QuizPage'
import ResultsPage from './ResultsPage'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/quiz' element={<QuizPage />} />
      <Route path='/results' element={<ResultsPage/>}/>
    </Routes>
  )
}

export default App
