import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient'; 
import '../../index.css';

const AddUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { firstName, lastName, email, password } = user;

    // Validation check
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill out all fields');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { first_name: firstName, last_name: lastName, email, password } // Make sure column names match your database schema
        ]);

      if (error) {
        console.error('Error adding user:', error.message);
        alert(`Error adding user: ${error.message}`);
      } else {
        console.log('User added:', data);
        alert('User added successfully!');
        setUser({ firstName: '', lastName: '', email: '', password: '' }); // Reset form
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-5">
        <h2 className="text-xl font-bold mb-5">Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 font-bold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
              placeholder="Enter firstName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
              placeholder="Enter LastName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
               placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2 font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
               placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className={`w-full bg-[#003366] text-white py-3 rounded-lg hover:bg-[#004080] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} 
          >
            {loading ? 'Adding User...' : '+ Add User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
