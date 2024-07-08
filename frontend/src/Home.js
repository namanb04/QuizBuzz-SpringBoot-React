import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <h1>Quiz Application</h1>
      <Link to="/create-quiz">Generate Quiz</Link>
      <br />
      <br />
      <Link to="/take-quiz">Take Quiz</Link>
    </div>
  );
}

export default Home;

