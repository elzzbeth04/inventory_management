import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { supabase } from '../../api/supabaseClient'; 
import '../../App.css';
import '../../index.css';

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // To populate supplier dropdown
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch orders
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*');
      
      if (error) {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders. Please try again.');
      } else {
        setOrders(data);
      }
    };

    // Fetch suppliers for dropdown in modal
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*');
      
      if (error) {
        console.error('Error fetching suppliers:', error);
        alert('Error fetching suppliers. Please try again.');
      } else {
        setSuppliers(data);
      }
    };

    fetchOrders();
    fetchSuppliers();
  }, []);

  // Handle edit button click
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  // Handle delete button click
  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('purchase_orders')
      .delete()
      .eq('id', orderId);
    
    if (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order. Please try again.');
    } else {
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order deleted successfully!');
    }
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  // Handle save/update in modal
  const handleSave = async () => {
    if (!selectedOrder) return;

    const { id, product, quantity, supplier, status, ordered_by, created_date, delivery_history } = selectedOrder;

    // Input validation can be added here as needed

    const { error } = await supabase
      .from('purchase_orders')
      .update({ product, quantity, supplier, status, ordered_by, created_date, delivery_history })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please try again.');
    } else {
      const updatedOrders = orders.map(order => order.id === id ? selectedOrder : order);
      setOrders(updatedOrders);
      alert('Order updated successfully!');
      handleClose();
    }
  };

  // Handle input changes in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder(prev => ({ ...prev, [name]: value }));
  };

  // Handle status change directly from table
  const handleStatusChange = async (orderId, newStatus) => {
    const { error } = await supabase
      .from('purchase_orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    
    if (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    } else {
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      alert('Status updated successfully!');
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen rounded-lg">
      <h2 className="text-xl font-semibold mb-4 ml-4">List of Purchase Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center">No orders found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg ml-4">
          <table className="min-w-full">
            <thead className="bg-[#003366] text-white rounded-t-lg">
              <tr>
                <th className="py-2 px-4 border-b text-left">SL No.</th>
                <th className="py-2 px-4 border-b text-left">Product</th>
                <th className="py-2 px-4 border-b text-left">Quantity Ordered</th>
                <th className="py-2 px-4 border-b text-left">Supplier</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Ordered By</th>
                <th className="py-2 px-4 border-b text-left">Created Date</th>
                <th className="py-2 px-4 border-b text-left">Delivery History</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{order.product}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                  <td className="py-2 px-4">{order.supplier}</td>
                  <td className="py-2 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">{order.ordered_by}</td>
                  <td className="py-2 px-4">{new Date(order.created_date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{order.delivery_history}</td>
                  <td className="py-2 px-4 flex space-x-2">
                  <IconButton color="primary" aria-label="delete" size="small" onClick={() => handleDelete(order.id)}>
                      <DeleteIcon fontSize="small" style={{ color: '#003366'}} />
                    </IconButton>
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEditClick(order)}>
                      <EditIcon fontSize="small" style={{ color: '#003366'}} />
                    </IconButton>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Order Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Purchase Order</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <TextField
                margin="dense"
                label="Product"
                name="product"
                value={selectedOrder.product}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Quantity Ordered"
                name="quantity"
                type="number"
                value={selectedOrder.quantity}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                inputProps={{ min: 1 }}
              />
              <TextField
                margin="dense"
                label="Supplier"
                name="supplier"
                value={selectedOrder.supplier}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                select
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.supplier_name}>
                    {supplier.supplier_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                label="Status"
                name="status"
                value={selectedOrder.status}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                select
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                label="Ordered By"
                name="ordered_by"
                value={selectedOrder.ordered_by}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Created Date"
                name="created_date"
                type="date"
                value={selectedOrder.created_date ? selectedOrder.created_date.split('T')[0] : ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                label="Delivery History"
                name="delivery_history"
                value={selectedOrder.delivery_history}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewOrder;
