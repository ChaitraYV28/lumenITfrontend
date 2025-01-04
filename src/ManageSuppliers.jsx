// ManageSuppliers.jsx

import React, { useState, useEffect } from 'react';
import './ManageSuppliers.css';

function ManageSuppliers() {
  // Load suppliers from localStorage or initialize with default suppliers
  const [suppliers, setSuppliers] = useState(() => {
    const savedSuppliers = localStorage.getItem('suppliers');
    return savedSuppliers ? JSON.parse(savedSuppliers) : [
     
    ];
  });

  const [formData, setFormData] = useState({ supplierId: '', name: '', contact: '', email: '' });
  const [submittedSupplier, setSubmittedSupplier] = useState(null);

  // Save suppliers to localStorage whenever the suppliers state changes
  useEffect(() => {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.supplierId && formData.name && formData.contact && formData.email) {
      const newSupplier = { id: suppliers.length + 1, ...formData };
      setSuppliers([...suppliers, newSupplier]);
      setSubmittedSupplier(newSupplier);
      setFormData({ supplierId: '', name: '', contact: '', email: '' });
    } else {
      alert('All fields are required!');
    }
  };

  const deleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Suppliers</h2>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="supplierId"
          placeholder="Supplier ID"
          value={formData.supplierId}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <button className="button" type="submit">Add Supplier</button>
      </form>

      {submittedSupplier && (
        <div className="submitted-supplier">
          <h3>Submitted Supplier Details:</h3>
          <p>Supplier ID: {submittedSupplier.supplierId}</p>
          <p>Name: {submittedSupplier.name}</p>
          <p>Contact: {submittedSupplier.contact}</p>
          <p>Email: {submittedSupplier.email}</p>
        </div>
      )}

      <ul className="supplier-list">
        {suppliers.map(supplier => (
          <li key={supplier.id}>
            {supplier.supplierId} - {supplier.name} ({supplier.contact}) - {supplier.email}
            <button className="delete-button" onClick={() => deleteSupplier(supplier.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageSuppliers;
