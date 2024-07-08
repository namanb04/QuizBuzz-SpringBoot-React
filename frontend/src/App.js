import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CreateQuiz from './CreateQuiz';
import TakeQuiz from './TakeQuiz';
import "./App.css"

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/take-quiz" element={<TakeQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;