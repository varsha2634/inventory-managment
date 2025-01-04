import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <div className="main-content">
      <h1>Welcome to Netventory</h1>
      <p>
        Netventory is your ultimate telecom inventory management solution. 
        With Netventory, you can efficiently manage telecom products and services inventory, 
        ensuring seamless operations and enhanced productivity.
      </p>
      <h2>Key Features:</h2>
      <ul>
        <li>Real-time stock tracking</li>
        <li>User and supplier management</li>
        <li>Automated notifications for stock updates</li>
        <li>Detailed analytics and reporting</li>
        <li>Customizable product categories</li>
      </ul>
      <h2>Why Choose Us?</h2>
      <p>
        Netventory provides a user-friendly interface, robust functionality, and unparalleled 
        reliability. Whether you're a small telecom business or a large enterprise, Netventory 
        caters to all your inventory management needs.
      </p>
    </div>
  );
}

export default MainContent;
