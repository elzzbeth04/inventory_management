import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabaseClient'; // Adjust the path as needed
import SupplierTable from './supplierstable';

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);

      // Fetch suppliers from the "suppliers" table in Supabase
      const { data, error } = await supabase
        .from('suppliers')
        .select('*');

      if (error) {
        console.error('Error fetching suppliers:', error.message);
        alert('Error fetching suppliers');
      } else {
        setSuppliers(data);
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
        <SupplierTable suppliers={suppliers} />
      )}
    </div>
  );
};

export default ViewSuppliers;
