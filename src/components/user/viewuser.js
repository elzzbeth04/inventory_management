// src/components/ViewUser.js
import React, { useState } from 'react';
import '../../styles.css';


const ViewUser = () => {
  const [users, setUsers] = useState([
    { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@user.com', createdAt: 'Apr 28, 2023 @ 06:40:05 AM' },
    { firstName: 'John', lastName: 'Doe', email: 'johndoe@yahoo.com', createdAt: 'Apr 28, 2023 @ 06:05:49 AM' },
  ]);

  return (
    <div className="user-list-container">
      <h2>List of Users</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;
