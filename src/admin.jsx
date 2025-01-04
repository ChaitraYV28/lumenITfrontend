import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Include styling if required

function Admin() {
  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <div className="admin-options">
        <Link to="/manage-users" className="button">Manage Users</Link>
        {/* <button className="manage-options">Manage Products</button> */}
        <Link to="/manage-products" className="button">Manage Products</Link>
        <Link to="/manage-suppliers" className="button">Manage Suppliers</Link>
        <Link to="/manage-stock" className="button">Manage Stock</Link>
      </div>
    </div>
  );
}

export default Admin;
