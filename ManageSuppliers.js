import React, { useState } from "react";

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "Supplier A", contact: "123-456-789" },
    { id: 2, name: "Supplier B", contact: "987-654-321" },
  ]);

  const [newSupplier, setNewSupplier] = useState({ name: "", contact: "" });
  const [editingSupplier, setEditingSupplier] = useState(null);

  const handleAddSupplier = () => {
    const newId = suppliers.length ? suppliers[suppliers.length - 1].id + 1 : 1;
    setSuppliers([...suppliers, { ...newSupplier, id: newId }]);
    setNewSupplier({ name: "", contact: "" });
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
  };

  const handleEditSupplier = (id) => {
    const supplierToEdit = suppliers.find((supplier) => supplier.id === id);
    setNewSupplier({ name: supplierToEdit.name, contact: supplierToEdit.contact });
    setEditingSupplier(id);
  };

  const handleUpdateSupplier = () => {
    setSuppliers(suppliers.map(supplier =>
      supplier.id === editingSupplier ? { ...supplier, name: newSupplier.name, contact: newSupplier.contact } : supplier
    ));
    setEditingSupplier(null);
    setNewSupplier({ name: "", contact: "" });
  };

  return (
    <div className="manage-suppliers">
      <h2>Manage Suppliers</h2>
      <div className="add-supplier">
        <input
          type="text"
          value={newSupplier.name}
          placeholder="Supplier Name"
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
        />
        <input
          type="text"
          value={newSupplier.contact}
          placeholder="Contact Info"
          onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
        />
        {editingSupplier ? (
          <button onClick={handleUpdateSupplier}>Update Supplier</button>
        ) : (
          <button onClick={handleAddSupplier}>Add Supplier</button>
        )}
      </div>

      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.contact}
            <button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
            <button onClick={() => handleEditSupplier(supplier.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSup
