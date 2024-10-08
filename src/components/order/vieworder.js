import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { supabase } from '../../api/supabaseClient'; 

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*');

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);

  // Handle edit button click
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('purchase_orders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting order:', error);
    } else {
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleSave = async () => {
    const { id, product, quantity, supplier, status, ordered_by, created_date } = selectedOrder;
    const { error } = await supabase
      .from('purchase_orders')
      .update({ product, quantity, supplier, status, ordered_by, created_date })
      .eq('id', id);

    if (error) {
      console.error('Error updating order:', error);
    } else {
      const updatedOrders = orders.map(order =>
        order.id === id ? selectedOrder : order
      );
      setOrders(updatedOrders);
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({ ...selectedOrder, [name]: value });
  };

  return (
    <div className="p-5 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">List of Purchase Orders</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#003366] text-white">
              <th className="py-2 px-4">SL No.</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Quantity Ordered</th>
              <th className="py-2 px-4">Supplier</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ordered By</th>
              <th className="py-2 px-4">Created Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{order.product}</td>
                <td className="py-2 px-4">{order.quantity}</td>
                <td className="py-2 px-4">{order.supplier}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">{order.ordered_by}</td>
                <td className="py-2 px-4">{new Date(order.created_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <IconButton color="primary" onClick={() => handleEditClick(order)}>
                    <EditIcon fontSize="small" style={{ color: '#003366' }} />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleDelete(order.id)}>
                    <DeleteIcon fontSize="small" style={{ color: '#003366' }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <TextField
            label="Product"
            name="product"
            value={selectedOrder?.product || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={selectedOrder?.quantity || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Supplier"
            name="supplier"
            value={selectedOrder?.supplier || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={selectedOrder?.status || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ordered By"
            name="ordered_by"
            value={selectedOrder?.ordered_by || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Created Date"
            name="created_date"
            type="date"
            value={selectedOrder?.created_date?.split('T')[0] || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewOrder;
