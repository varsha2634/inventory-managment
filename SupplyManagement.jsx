import React, { useState, useEffect } from 'react';
import './SupplyManagement.css'; // Import CSS file

function SupplyManagement() {
  const [supplies, setSupplies] = useState([]);
  const [newSupplyName, setNewSupplyName] = useState('');
  const [newSupplyQuantity, setNewSupplyQuantity] = useState(0);

  // Fetch initial supply data (replace with your API endpoint)
  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await fetch('/api/supplies'); // Replace with your API endpoint
        const data = await response.json();
        setSupplies(data);
      } catch (error) {
        console.error('Error fetching supplies:', error);
      }
    };

    fetchSupplies();
  }, []);

  const handleAddSupply = async () => {
    try {
      const response = await fetch('/api/supplies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSupplyName, quantity: newSupplyQuantity }),
      });

      if (response.ok) {
        const newSupply = await response.json();
        setSupplies([...supplies, newSupply]);
        setNewSupplyName('');
        setNewSupplyQuantity(0);
      } else {
        console.error('Error adding supply:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding supply:', error);
    }
  };

  const handleDeleteSupply = async (id) => {
    try {
      const response = await fetch(`/api/supplies/${id}`, { method: 'DELETE' });

      if (response.ok) {
        setSupplies(supplies.filter((supply) => supply.id !== id));
      } else {
        console.error('Error deleting supply:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting supply:', error);
    }
  };

  return (
    <div className="container">
      <h1>Supply Management</h1>

      <div className="form-container">
        <h2>Add Supply</h2>
        <div className="form-group">
          <label htmlFor="supplyName">Supply Name:</label>
          <input
            type="text"
            id="supplyName"
            placeholder="Supply Name"
            value={newSupplyName}
            onChange={(e) => setNewSupplyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplyQuantity">Quantity:</label>
          <input
            type="number"
            id="supplyQuantity"
            placeholder="Quantity"
            value={newSupplyQuantity}
            onChange={(e) => setNewSupplyQuantity(Number(e.target.value))}
          />
        </div>
        <button className="add-button" onClick={handleAddSupply}>
          Add Supply
        </button>
      </div>

      <h2>Supplies</h2>
      <ul className="supply-list">
        {supplies.map((supply) => (
          <li key={supply.id} className="supply-item">
            {supply.name} - {supply.quantity}
            <button className="delete-button" onClick={() => handleDeleteSupply(supply.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SupplyManagement;