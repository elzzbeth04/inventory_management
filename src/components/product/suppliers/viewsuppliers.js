import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabaseClient';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const [selectedSupplier, setSelectedSupplier] = useState(null); // State to store selected supplier for editing

  const fetchSuppliers = async () => {
    setLoading(true);

    const { data: suppliersData, error } = await supabase
      .from('suppliers')
      .select(`
        id,
        supplier_name,
        location,
        email,
        created_at,
        products (product_name)
      `);

    if (error) {
      console.error('Error fetching suppliers:', error.message);
      alert('Error fetching suppliers');
    } else {
      const formattedSuppliers = suppliersData.map(supplier => ({
        ...supplier,
        products: supplier.products.map(product => product.product_name)
      }));
      setSuppliers(formattedSuppliers);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSuppliers(); // Fetch suppliers when the component mounts
  }, []);

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting supplier:', error.message);
      alert('Error deleting supplier');
    } else {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSupplier(null);
  };

  const handleUpdate = async () => {
    if (!selectedSupplier) return;

    const { error } = await supabase
      .from('suppliers')
      .update({
        supplier_name: selectedSupplier.supplier_name,
        location: selectedSupplier.location,
        email: selectedSupplier.email,
      })
      .eq('id', selectedSupplier.id);

    if (error) {
      console.error('Error updating supplier:', error.message);
      alert('Error updating supplier');
    } else {
      fetchSuppliers(); // Refresh the supplier list
      handleClose(); // Close the modal
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupplier((prev) => ({ ...prev, [name]: value })); // Update selected supplier
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg ">
      <h2 className="text-xl font-semibold mb-2 ml-2 ">View Suppliers</h2>
      {loading ? (
        <p>Loading suppliers...</p>
      ) : (
        <table className="min-w-full ml-2 mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#003366] text-white rounded-t-lg">
            <tr>
              <th className="py-2 px-4 border-b text-left">Supplier ID</th>
              <th className="py-2 px-4 border-b text-left">Supplier Name</th>
              <th className="py-2 px-4 border-b text-left">Location</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Products</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b text-left">Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">No suppliers available.</td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="py-2 px-4 border-b">{supplier.id}</td>
                  <td className="py-2 px-4 border-b">{supplier.supplier_name}</td>
                  <td className="py-2 px-4 border-b">{supplier.location}</td>
                  <td className="py-2 px-4 border-b">{supplier.email}</td>
                  <td className="py-2 px-4 border-b">
                    {supplier.products.length > 0 ? supplier.products.join(', ') : 'No products available'}
                  </td>
                  <td className="py-2 px-4 border-b">{new Date(supplier.created_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b flex space-x-2"> {/* Added flex for action buttons */}
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEditClick(supplier)}>
                      <EditIcon fontSize="small" style={{ color: '#003366'}} />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete" size="small" onClick={() => handleDelete(supplier.id)}>
                      <DeleteIcon fontSize="small" style={{ color: '#003366' }} />
                    </IconButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Edit Supplier Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Supplier</DialogTitle>
        <DialogContent>
          {selectedSupplier && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="supplier_name"
                label="Supplier Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedSupplier.supplier_name}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="location"
                label="Location"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedSupplier.location}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={selectedSupplier.email}
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

export default ViewSuppliers;
