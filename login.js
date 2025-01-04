import React, { useState } from 'react';
import './index.css'; 
import { Link } from 'react-router';

function LoginPage() {
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
    role: 'Select Role',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="left-section">
          <h1>Welcome!</h1>
          <p>New to Netventory?  <Link to="./signup" style={{ color: 'white' }}>Sign up</Link></p>
        </div>
        <div className="right-section">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option disabled>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
            <button type="submit" className="signup-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
