import React from 'react';
import './App.css'; // Import your CSS file

function Netventory() {
  const googleImageUrl = 'https://telecomreviewasia.com/images/stories/2021/01/telecommunications-industry-analysis.jpg'; // Replace with your Google image URL

  return (
    <div className="netventory-container">
      <div className="content">
        <h1>Netventory</h1>
        <p>Welcome to Netventory.</p>
        <p>The ultimate solution for managing your telecom products and services inventory with ease and efficiency.</p>
        <button className="login-button">LOGIN</button>
      </div>
      <div className="background-image" style={{ backgroundImage: `url(${googleImageUrl})` }}>
      </div>
    </div>
  );
}

export default Netventory;