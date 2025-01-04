import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LoginPage from './login.js';
import SignupPage from './signup.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
