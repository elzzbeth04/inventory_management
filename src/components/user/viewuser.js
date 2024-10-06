// src/components/ViewUser.js
// src/components/ViewUser.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient'; // Correct

import '../../index.css';

const ViewUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch all users from Supabase 'users' table
      const { data, error } = await supabase
        .from('users')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="user-list-container mx-auto w-[90%] my-12">
      <h2 className="text-2xl font-bold mb-5 p-4 bg-gray-100 rounded-lg">List of Users</h2>
      <table className="user-table w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-3">First Name</th>
            <th className="p-3">Last Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{user.firstName}</td>
              <td className="p-3">{user.lastName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{new Date(user.createdAt).toLocaleString()}</td>
              <td className="p-3 flex space-x-2">
                <button className="edit-btn bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700">Edit</button>
                <button className="delete-btn bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;

/*import React, { useState } from 'react';
import '../../index.css';

const ViewUser = () => {
  const [users, setUsers] = useState([
    { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@user.com', createdAt: 'Apr 28, 2023 @ 06:40:05 AM' },
    { firstName: 'John', lastName: 'Doe', email: 'johndoe@yahoo.com', createdAt: 'Apr 28, 2023 @ 06:05:49 AM' },
  ]);

  return (
    <div className="user-list-container mx-auto w-[90%] my-12">
      <h2 className="text-2xl font-bold mb-5 p-4 bg-gray-100 rounded-lg">List of Users</h2>
      <table className="user-table w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-3">First Name</th>
            <th className="p-3">Last Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{user.firstName}</td>
              <td className="p-3">{user.lastName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.createdAt}</td>
              <td className="p-3 flex space-x-2">
                <button className="edit-btn bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700">Edit</button>
                <button className="delete-btn bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;
*/