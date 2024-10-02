import React, { useEffect, useState } from 'react';
import SupplierTable from './supplierstable';

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const fetchedSuppliers = [
        {
          id: 1,
          name: 'Supplier A',
          location: 'Location A',
          contactDetails: 'Contact A',
          productCreatedBy: 'Product A',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
        },
        // Add more suppliers as needed
      ];
      setSuppliers(fetchedSuppliers);
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">View Suppliers</h1>
      <SupplierTable suppliers={suppliers} />
    </div>
  );
};

export default ViewSuppliers;
