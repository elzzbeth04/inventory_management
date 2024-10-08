import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../index.css';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user for editing

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('"firstName", "lastName", email, "createdAt"');

      if (error) {
        console.error('Error fetching users:', error.message);
        alert(`Error fetching users: ${error.message}`);
      } else {
        console.log("Fetched users:", data);
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert(`Error fetching users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null); // Reset the selected user
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;
    
    const { error } = await supabase
      .from('users')
      .update({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
      })
      .eq('email', selectedUser.email); // Assuming email is unique

    if (error) {
      console.error('Error updating user:', error.message);
      alert(`Error updating user: ${error.message}`);
    } else {
      fetchUsers(); // Refresh the user list
      handleClose(); // Close the modal
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value })); // Update selected user
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4 ml-4">List of Users</h2>
      {users.length === 0 ? (
        <div className="text-center">No users found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg ml-4">
          <table className="min-w-full">
            <thead className="bg-[#003366] text-white">
              <tr>
                <th className="py-2 px-4 border-b text-left">First Name</th>
                <th className="py-2 px-4 border-b text-left">Last Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Created At</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{user.firstName}</td>
                  <td className="py-2 px-4">{user.lastName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEditClick(user)}>
                      <EditIcon fontSize="small" style={{ color: '#003366' }} />
                    </IconButton>
                    <IconButton color="primary" aria-label="delete" size="small">
                      <DeleteIcon fontSize="small" style={{ color: '#003366' }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit User Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedUser.firstName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedUser.lastName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={selectedUser.email}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewUser;
