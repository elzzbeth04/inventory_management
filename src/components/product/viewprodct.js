import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../App.css';
import '../../index.css';
const ViewUser = () => {
  const [users, setUsers] = useState([
    { productName: 'Nescafe', supplier: 'Nestle', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Coffee' },
    { productName: 'KitKat', supplier: 'Nestle', createdAt: 'Apr 28, 2023 @ 06:40:05 AM', description: 'Chocolate' },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle edit button click
  const handleEditClick = (index) => {
    setSelectedUser({ ...users[index], index });
    setOpen(true);
  };

  // Handle delete button click
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    const updatedUsers = [...users];
    updatedUsers[selectedUser.index] = selectedUser;
    setUsers(updatedUsers);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
    <div className="user-list-container p-8">
      <h2 className="text-xl font-semibold mb-4">List of Products</h2>
      <table className="min-w-full border border-gray-300 border-collapse">
        <thead>
        <tr  className="bg-[#003366] text-white">
            <th className="border border-gray-500 px-1 py-2 text-center w-8">Product Name</th>
            <th className="border border-gray-500 px-1 py-2 text-center w-8">Supplier</th>
            <th className="border border-gray-500 px-1 py-2 text-center w-8">Created At</th>
            <th className="border border-gray-500 px-1 py-2 text-center w-8">Description</th>
            <th className="border border-gray-500 px-1 py-2 text-center w-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="border border-gray-500 px-1 py-2 text-center w-8">{user.productName}</td>
              <td className="border border-gray-500 px-1 py-2 text-center w-8">{user.supplier}</td>
              <td className="border border-gray-500 px-1 py-2 text-center w-8">{user.createdAt}</td>
              <td className="border border-gray-500 px-1 py-2 text-center w-8">{user.description}</td>
              <td className="border border-gray-500 px-1 py-2 text-center w-8">
                <IconButton color="primary" aria-label="delete" size="small" onClick={() => handleDelete(index)}>
                  <DeleteIcon fontSize="small" style={{ color: 'red' }} />
                </IconButton>
                <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEditClick(index)}>
                  <EditIcon fontSize="small" style={{ color: 'grey' }} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Material-UI Dialog for editing */}
      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="productName"
              label="Product Name"
              type="text"
              fullWidth
              value={selectedUser.productName}
              onChange={handleChange}
            />
            <TextField
              select
              margin="dense"
              name="supplier"
              label="Supplier"
              fullWidth
              value={selectedUser.supplier}
              onChange={handleChange}
            >
              <MenuItem value="Nestle">Nestle</MenuItem>
              <MenuItem value="Robinson">Robinson</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={selectedUser.description}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ViewUser;
