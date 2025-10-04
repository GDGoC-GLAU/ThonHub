import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
        <header className="App-header">
          <h1>ThonHub</h1>
          <p>Hackathon Platform - Coming Soon!</p>
        </header>
      </div>
    </Router>
  );
}

export default App;