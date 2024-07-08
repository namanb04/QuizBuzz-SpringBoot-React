import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from './api';
import './CreateQuiz.css'

const CreateQuiz = () => {
  const [category, setCategory] = useState('');
  const [numQues, setNumQues] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuiz(category, numQues, difficulty, title).then(() => {
        alert(`Quiz Created successfully`);
        navigate('/');
    }).catch(error => {
        console.error("Error creating quiz", error);
        alert(`Please provide all required values`);
    })
  };

  return (
    <div className='create-quiz'>
      <h1>Generate Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" selected disabled hidden>Select Topic</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <div>
          <label>Number of Questions:</label>
          <select value={numQues} onChange={(e) => { setNumQues(parseInt(e.target.value, 10)); }}>
            <option value="" selected disabled hidden>Select number of questions</option>
            {[...Array(7).keys()].map(num => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="" selected disabled hidden>Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateQuiz;
