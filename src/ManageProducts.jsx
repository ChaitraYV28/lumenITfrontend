// ManageProducts.jsx

import React, { useState, useEffect } from 'react';
import './ManageProducts.css';

function ManageProducts() {
  // Load products from localStorage or initialize with default products
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
    ];
  });

  const [formData, setFormData] = useState({ productId: '', name: '', category: '', price: '' });
  const [submittedProduct, setSubmittedProduct] = useState(null);

  // Save products to localStorage whenever the products state changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.productId && formData.name && formData.category && formData.price) {
      const newProduct = { id: products.length + 1, ...formData, price: parseFloat(formData.price) };
      setProducts([...products, newProduct]);
      setSubmittedProduct(newProduct);
      setFormData({ productId: '', name: '', category: '', price: '' });
    } else {
      alert('All fields are required!');
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="productId"
          placeholder="Product ID"
          value={formData.productId}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <button className="button" type="submit">Add Product</button>
      </form>

      {submittedProduct && (
        <div className="submitted-product">
          <h3>Submitted Product Details:</h3>
          <p>Product ID: {submittedProduct.productId}</p>
          <p>Name: {submittedProduct.name}</p>
          <p>Category: {submittedProduct.category}</p>
          <p>Price: ${submittedProduct.price.toFixed(2)}</p>
        </div>
      )}

      <ul className="product-list">
        {products.map(product => (
          <li key={product.id}>
            {product.productId} - {product.name} ({product.category}) - ${product.price.toFixed(2)}
            <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageProducts;
