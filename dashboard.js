import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({
  addProduct,
  deleteProduct,
  editProduct,
  addSupplier,
  deleteSupplier,
  editSupplier,
  products,
  suppliers
}) => {
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0 });
  const [newSupplier, setNewSupplier] = useState({ name: "", contact: "" });

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div>
        <h3>Manage Products</h3>
        <button onClick={() => addProduct({ id: products.length + 1, name: "New Product", quantity: 10 })}>Add Product</button>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.quantity} units
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
              <button onClick={() => editProduct({ id: product.id, name: "Updated Product", quantity: product.quantity + 1 })}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3>Manage Suppliers</h3>
        <button onClick={() => addSupplier({ id: suppliers.length + 1, name: "New Supplier", contact: "000-000-000" })}>Add Supplier</button>
        <ul>
          {suppliers.map(supplier => (
            <li key={supplier.id}>
              {supplier.name} - {supplier.contact}
              <button onClick={() => deleteSupplier(supplier.id)}>Delete</button>
              <button onClick={() => editSupplier({ id: supplier.id, name: "Updated Supplier", contact: supplier.contact })}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
