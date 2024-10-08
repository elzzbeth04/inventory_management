import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient';

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders when the component mounts
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

  // Handle status change for existing orders and update the database
  const handleStatusChange = async (index, newStatus) => {
    const updatedOrders = [...orders];
    const orderId = updatedOrders[index].id;

    // Update the status in the state
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);

    // Update the status in the database
    const { error } = await supabase
      .from('purchase_orders')
      .update({ status: newStatus }) // Update the status in the database
      .eq('id', orderId); // Target the specific order using its ID

    if (error) {
      console.error('Error updating status:', error);
    } else {
      console.log(`Order ID ${orderId} status updated to ${newStatus}`);
    }
  };

  // Handle edit action (Implement your logic here)
  const handleEdit = (orderId) => {
    console.log('Editing order with ID:', orderId);
    // Implement edit functionality based on your requirements
  };

  // Handle delete action
  const handleDelete = async (orderId) => {
    const { error } = await supabase
      .from('purchase_orders')
      .delete()
      .eq('id', orderId); // Delete the specific order by ID

    if (error) {
      console.error('Error deleting order:', error);
    } else {
      // Remove the deleted order from the state
      setOrders(orders.filter(order => order.id !== orderId));
      console.log('Order deleted with ID:', orderId);
    }
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
              <th className="py-2 px-4">Delivery History</th>
              <th className="py-2 px-4">Actions</th> {/* Added actions column */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{order.product}</td>
                <td className="py-2 px-4">{order.quantity}</td>
                <td className="py-2 px-4">{order.supplier}</td>
                <td className="py-2 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="py-2 px-4">{order.ordered_by}</td>
                <td className="py-2 px-4">{new Date(order.created_date).toLocaleDateString()}</td>
                <td className="py-2 px-4">{order.delivery_history}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="bg-[#003366] hover:bg-[#004080] text-white py-1 px-3 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-[#003366] hover:bg-[#004080] text-white py-1 px-3 rounded text-xs ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#004080]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;
/*
import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient'; 

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

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

  // Handle status change for existing orders and update the database
  const handleStatusChange = async (index, newStatus) => {
    const updatedOrders = [...orders];
    const orderId = updatedOrders[index].id;

    // Update the status in the state
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);

    // Update the status in the database
    const { error } = await supabase
      .from('purchase_orders')
      .update({ status: newStatus }) // Update the status in the database
      .eq('id', orderId); // Target the specific order using its ID

    if (error) {
      console.error('Error updating status:', error);
    } else {
      console.log(`Order ID ${orderId} status updated to ${newStatus}`);
    }
  };

  // Handle edit action (Implement your logic here)
  const handleEdit = (orderId) => {
    console.log('Editing order with ID:', orderId);
    // Implement edit functionality based on your requirements
  };

  // Handle delete action
  const handleDelete = async (orderId) => {
    const { error } = await supabase
      .from('purchase_orders')
      .delete()
      .eq('id', orderId); // Delete the specific order by ID

    if (error) {
      console.error('Error deleting order:', error);
    } else {
      // Remove the deleted order from the state
      setOrders(orders.filter(order => order.id !== orderId));
      console.log('Order deleted with ID:', orderId);
    }
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
              <th className="py-2 px-4">Delivery History</th>
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
                <td className="py-2 px-4">{order.delivery_history}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#004080]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;*/

