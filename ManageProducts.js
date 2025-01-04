import React, { useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Router", quantity: 5 },
    { id: 2, name: "Modem", quantity: 2 },
    { id: 3, name: "Switch", quantity: 15 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0 });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setNewProduct({ name: "", quantity: 0 });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setNewProduct({ name: productToEdit.name, quantity: productToEdit.quantity });
    setEditingProduct(id);
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(product =>
      product.id === editingProduct ? { ...product, name: newProduct.name, quantity: newProduct.quantity } : product
    ));
    setEditingProduct(null);
    setNewProduct({ name: "", quantity: 0 });
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      <div className="add-product">
        <input
          type="text"
          value={newProduct.name}
          placeholder="Product Name"
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          value={newProduct.quantity}
          placeholder="Quantity"
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        {editingProduct ? (
          <button onClick={handleUpdateProduct}>Update Product</button>
        ) : (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} units
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
