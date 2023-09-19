import { Link } from 'react-router-dom'
import {quizwiz} from '../assets'
const Header = () => {
  return (
      <header className='text-black bg-gray-200 w-full py-4'>
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/"><img src={quizwiz} alt='quizwiz-logo' className=' w-64'/></Link>
              
              <button type="button" onClick={()=>window.open('https://github.com/ehteshamul51haque/Quiz_App')} className='px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition duration-300'>GitHub</button>
          </nav>
    </header>
  )
}

export default Header
