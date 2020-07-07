import React from 'react';
import './App.css';
import TopTime from './components/TopTime'
import StatusBar from './components/StatusBar'
import MiniDash from './components/MiniDash'

function App() {
  return (
    <div className="container">
      <TopTime />
      <StatusBar />
      <MiniDash />
    </div>
  );
}

export default App;
