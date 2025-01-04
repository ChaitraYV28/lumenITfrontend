// ManageStock.jsx
import React, { useState, useEffect } from 'react';
import './ManageStock.css';

function ManageStock() {
  // Load stocks from localStorage or initialize with default stock data
  const [stocks, setStocks] = useState(() => {
    const savedStocks = localStorage.getItem('stocks');
    return savedStocks ? JSON.parse(savedStocks) : [
      { id: 1, productId: 'P101', productName: 'Router', quantity: 50 },
      { id: 2, productId: 'P102', productName: 'Modem', quantity: 30 },
    ];
  });

  const [formData, setFormData] = useState({ productId: '', productName: '', quantity: '' });

  // Save stocks to localStorage whenever stocks state changes
  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.productId && formData.productName && formData.quantity) {
      const newStock = { id: stocks.length + 1, ...formData, quantity: parseInt(formData.quantity, 10) };
      setStocks([...stocks, newStock]);
      setFormData({ productId: '', productName: '', quantity: '' });
    } else {
      alert('All fields are required!');
    }
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Stock</h2>
      <form className="stock-form" onSubmit={handleSubmit}>
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
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <button className="button" type="submit">Add Stock</button>
      </form>

      <ul className="stock-list">
        {stocks.map(stock => (
          <li key={stock.id}>
            {stock.productId} - {stock.productName} (Quantity: {stock.quantity})
            <button className="delete-button" onClick={() => deleteStock(stock.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageStock;
