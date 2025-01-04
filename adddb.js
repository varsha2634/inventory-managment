import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

function App() {
  const [userRole, setUserRole] = useState('Admin'); // You can change this value based on the role (Admin, Manager, Staff)
  
  // Dummy data for products and suppliers
  const [products, setProducts] = useState([
    { id: 1, name: "Router", quantity: 5 },
    { id: 2, name: "Modem", quantity: 10 },
    { id: 3, name: "Switch", quantity: 3 }
  ]);
  
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "Supplier A", contact: "123-456-789" },
    { id: 2, name: "Supplier B", contact: "987-654-321" }
  ]);

  // Functions for adding, editing, and deleting products
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const editProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  // Functions for adding, editing, and deleting suppliers
  const addSupplier = (newSupplier) => {
    setSuppliers([...suppliers, newSupplier]);
  };

  const deleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const editSupplier = (updatedSupplier) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === updatedSupplier.id ? updatedSupplier : supplier
    ));
  };

  return (
    <Router>
      <div className="navbar">
        <div className="logo">
          <Link to="/">Telecom Inventory</Link>
        </div>

        <div className="navbar-center">
          <input type="text" id="search-bar" placeholder="Search products..." />
        </div>

        <div className="navbar-right">
          <ul className="navbar-links">
            <li><Link to="/dashboard">Dashboard</Link></li>
            {userRole === 'Admin' && (
              <>
                <li><Link to="/manage-users">Manage Users</Link></li>
                <li><Link to="/products">Product Management</Link></li>
                <li><Link to="/suppliers">Supplier Management</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/settings">System Settings</Link></li>
              </>
            )}
            {userRole === 'Manager' && (
              <>
                <li><Link to="/products">Product Management</Link></li>
                <li><Link to="/suppliers">Supplier Management</Link></li>
                <li><Link to="/stock-transactions">Stock Transactions</Link></li>
                <li><Link to="/reports">Reports</Link></li>
              </>
            )}
            {userRole === 'Staff' && (
              <>
                <li><Link to="/product-stock">Product Stock</Link></li>
                <li><Link to="/stock-transactions">Stock Transactions</Link></li>
              </>
            )}
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </div>

      <Routes>
        <Route path="/dashboard" element={
          <Dashboard
            addProduct={addProduct}
            deleteProduct={deleteProduct}
            editProduct={editProduct}
            addSupplier={addSupplier}
            deleteSupplier={deleteSupplier}
            editSupplier={editSupplier}
            products={products}
            suppliers={suppliers}
          />
        } />
        <Route path="/products" element={<h2>Product Management</h2>} />
        <Route path="/suppliers" element={<h2>Supplier Management</h2>} />
        <Route path="/profile" element={<h2>Profile</h2>} />
        <Route path="/logout" element={<h2>Logout</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
