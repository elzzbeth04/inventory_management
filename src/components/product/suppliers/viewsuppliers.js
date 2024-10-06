import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabaseClient'; // Adjust the path as needed

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    fetchSuppliers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">View Suppliers</h1>
      {loading ? (
        <p>Loading suppliers...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Supplier ID</th>
              <th className="py-2 px-4 border-b">Supplier Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Products</th>
              <th className="py-2 px-4 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">No suppliers available.</td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewSuppliers;
