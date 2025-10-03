import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ThemeToggle />
          <h1>ThonHub</h1>
          <p>Hackathon Platform - Coming Soon!</p>
        </header>
      </div>
    </Router>
  );
}

export default App;
