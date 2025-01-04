import React, { useState, useEffect } from 'react';
import './ManageUsers.css';

function ManageUsers() {
  // Load users from localStorage or initialize with default users
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [formData, setFormData] = useState({ userId: '', name: '', email: '', role: 'Staff' });
  const [submittedUser, setSubmittedUser] = useState(null);

  // Save users to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userId && formData.name && formData.email && formData.role) {
      const newUser = { id: users.length + 1, ...formData };
      setUsers([...users, newUser]);
      setSubmittedUser(newUser);
      setFormData({ userId: '', name: '', email: '', role: 'Staff' });
    } else {
      alert('All fields are required!');
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setFormData({ userId: userToEdit.userId, name: userToEdit.name, email: userToEdit.email, role: userToEdit.role });
      deleteUser(id);
    }
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleInputChange}
        />
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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
        <select
          className="input"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
        <button className="button" type="submit">Add User</button>
      </form>

      {submittedUser && (
        <div className="submitted-user">
          <h3>Submitted User Details:</h3>
          <p>User ID: {submittedUser.userId}</p>
          <p>Name: {submittedUser.name}</p>
          <p>Email: {submittedUser.email}</p>
          <p>Role: {submittedUser.role}</p>
        </div>
      )}

      <ul className="user-list">
        {users.map(user => (
          <li key={user.id}>
            {user.userId} - {user.name} ({user.email}) [Role: {user.role}]
            <button className="edit-button" onClick={() => editUser(user.id)}>Edit</button>
            <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
