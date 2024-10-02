import React, { useState } from 'react';
import AddProduct from './addproduct'; // Adjust the import path as needed
import viewproduct from './viewprodct'; // Adjust the import path as needed

const UserManagement = () => {
  // State to hold the list of users/products
  const [users, setUsers] = useState([
    { productName: 'Electronics', supplier: 'Nestle', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Coffee' },
    { productName: 'Crockery', supplier: 'Nestle', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Chocolate' },
    { productName: 'Stationeries', supplier: 'Robinson', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Coffee' },
    { productName: 'Confectioneries', supplier: 'George Bakers', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Chocolate' },
    { productName: 'Grocery', supplier: 'Nestle', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Coffee' },
    { productName: 'Utilities', supplier: 'Nestle', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Chocolate' },
  ]);

  // Function to add a new user/product to the list
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>User Management</h1>
      {/* AddUser component for adding new users/products */}
      <AddProduct addUser={addUser} />
      {/* ViewUser component to display the list of users/products */}
      <viewproduct users={users} setUsers={setUsers} />
    </div>
  );
};

export default UserManagement;
