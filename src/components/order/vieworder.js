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

export default ViewOrder;

/*import React from 'react';

const ViewOrder = () => {
  const orders = [
    { id: 1, product: 'Product A', quantity: 100, supplier: 'Supplier A', status: 'Pending', orderedBy: 'User A', createdDate: '2023-09-01', deliveryHistory: 'On Time' },
    { id: 2, product: 'Product B', quantity: 200, supplier: 'Supplier B', status: 'Completed', orderedBy: 'User B', createdDate: '2023-09-02', deliveryHistory: 'Delayed' },
  ];

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
                <td className="py-2 px-4">{order.orderedBy}</td>
                <td className="py-2 px-4">{order.createdDate}</td>
                <td className="py-2 px-4">{order.deliveryHistory}</td>
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
