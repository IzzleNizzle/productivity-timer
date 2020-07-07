import React from 'react';
import './App.css';
import TopTime from './components/TopTime'
import StatusBar from './components/StatusBar'
import MiniDash from './components/MiniDash'
import Activities from './components/Activities'

function App() {
  return (
    <div className="container">
      <TopTime />
      <StatusBar />
      <MiniDash />
      <Activities />
    </div>
  );
}

export default App;
