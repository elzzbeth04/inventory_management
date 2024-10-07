import React, { useState } from 'react';

const ViewOrder = () => {
  const [orders, setOrders] = useState([
    { id: 1, product: 'Product A', quantity: 100, supplier: 'Supplier A', status: 'Pending', orderedBy: 'User A', createdDate: '2023-09-01', deliveryHistory: 'On Time' },
    { id: 2, product: 'Product B', quantity: 200, supplier: 'Supplier B', status: 'Completed', orderedBy: 'User B', createdDate: '2023-09-02', deliveryHistory: 'Delayed' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleEdit = (id) => {
    console.log('Edit Order ID:', id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
      console.log('Order deleted:', id);
    }
  };

  const handleUpdate = () => {
    console.log('Orders updated:', orders);
    alert('Order statuses updated successfully!');
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
              <th className="py-2 px-4">Actions</th> {/* Action column */}
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
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

                <td className="py-2 px-4">{order.orderedBy}</td>
                <td className="py-2 px-4">{order.createdDate}</td>
                <td className="py-2 px-4">{order.deliveryHistory}</td>

                {/* Action buttons with spacing */}
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="bg-[#003366] hover:bg-[#004080] text-white py-1 px-3 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-[#003366] hover:bg-[#004080] text-white py-1 px-3 rounded text-xs ml-2" // Added margin-left
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
          onClick={handleUpdate} // Trigger the update function
          className="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#004080]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;