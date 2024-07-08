import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuiz, getQuizQuestions, submitQuiz } from './api';
import './TakeQuiz.css'

const TakeQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllQuiz().then(response => {
      setQuizzes(response.data);
    });
  }, []);

  const handleQuizSelect = (e) => {
    const quizId = e.target.value;
    setSelectedQuiz(quizId);
    getQuizQuestions(quizId).then(response => {
      setQuestions(response.data);
      setResponses(response.data.map(q => ({ id: q.id, response: '' })));
    });
  };

  const handleResponseChange = (questionId, answer) => {
    setResponses(responses.map(r => (r.id === questionId ? { ...r, response: answer } : r)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuiz(selectedQuiz, responses).then(response => {
      alert(`Quiz submitted! Your score is: ${response.data}`);
      navigate('/');
    }).catch(error => {
        console.error("Error submitting", error);
    });
  };

  return (
    <div className='take-quiz'>
      <h1>Take Quiz</h1>
      <select onChange={handleQuizSelect} value={selectedQuiz}>
        <option value="" selected disabled hidden>Select a quiz</option>
        {quizzes.map(quiz => (
          <option key={quiz.id} value={quiz.id}>
            {quiz.title}
          </option>
        ))}
      </select>

      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={question.id}>
              <p>{index + 1}. {question.questionTitle}</p>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={question.option1}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                  {question.option1}
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={question.option2}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                  {question.option2}
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={question.option3}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                  {question.option3}
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={question.option4}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                  {question.option4}
                </label>
              </div>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default TakeQuiz;
