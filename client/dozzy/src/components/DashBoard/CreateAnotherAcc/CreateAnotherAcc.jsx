// src/components/DashBoard/CreateAccount.js
import React, { useState } from 'react';

const CreateAccount = () => {
  const [form, setForm] = useState({ name: '', email: '', role: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch to backend API
    console.log("Creating user:", form);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full mb-3 p-2 border rounded" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mb-3 p-2 border rounded" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full mb-3 p-2 border rounded" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="cashier">Cashier</option>
        </select>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
