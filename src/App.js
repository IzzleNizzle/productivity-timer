import React from 'react';
import './App.css';
import TopTime from './components/TopTime'
import StatusBar from './components/StatusBar'

function App() {
  return (
    <div className="container">
      <TopTime />
      <StatusBar />
    </div>
  );
}

export default App;
