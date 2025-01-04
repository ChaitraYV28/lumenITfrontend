import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './admin';
import ManageUsers from './ManageUsers';
import './App.css'; // Include CSS if required
import ManageProducts from './ManageProducts';
import ManageSuppliers from './ManageSuppliers';
import ManageStock from './ManageStock';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/" element={<Admin />} />
        <Route path='/manage-products' element={<ManageProducts/>}/>
        <Route path='/manage-suppliers' element={<ManageSuppliers/>}/>
        <Route path='/manage-stock' element={<ManageStock/>}/>
    
      </Routes>
    </Router>
  );
}

export default App;
