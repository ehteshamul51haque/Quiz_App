import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import ResultsPage from "./ResultsPage";
import Header from "./components/Header";
function App() {
  return (
    <main>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:category" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
    </main>
  );
}

export default App;
