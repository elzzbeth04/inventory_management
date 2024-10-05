import React, { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabaseClient'; // Adjust the path as needed
import SupplierTable from './supplierstable';

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);

      // Fetch suppliers and associated products from Supabase
      const { data: suppliersData, error: suppliersError } = await supabase
        .from('suppliers')
        .select(`
          *,
          products (supplier_id)  -- Join to get product names
        `);

      if (suppliersError) {
        console.error('Error fetching suppliers:', suppliersError.message);
        alert('Error fetching suppliers');
      } else {
        // Format the products into a readable array for each supplier
        const formattedData = suppliersData.map(supplier => ({
          ...supplier,
          products: supplier.products.map(product => product.product_name), // Extract product names
        }));
        setSuppliers(formattedData);
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

// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../../api/supabaseClient'; // Adjust the path as needed
// import SupplierTable from './supplierstable';
// import CreateSupplier from '../suppliers/createsupplier'; // Import the CreateSupplier component

// const ViewSuppliers = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSuppliers = async () => {
//     setLoading(true);

//     // Fetch suppliers from the "suppliers" table in Supabase
//     const { data, error } = await supabase
//       .from('suppliers')
//       .select('*');

//     if (error) {
//       console.error('Error fetching suppliers:', error.message);
//       alert('Error fetching suppliers');
//     } else {
//       setSuppliers(data);
//     }

//     setLoading(false);
//   };

//   // Fetch suppliers on component mount
//   useEffect(() => {
//     fetchSuppliers();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">View Suppliers</h1>

//       <CreateSupplier onSupplierAdded={fetchSuppliers} /> {/* Pass fetchSuppliers as a prop */}

//       {loading ? (
//         <p>Loading suppliers...</p>
//       ) : (
//         <SupplierTable suppliers={suppliers} />
//       )}
//     </div>
//   );
// };

// export default ViewSuppliers;












// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../../api/supabaseClient'; // Adjust path as needed

// const ViewSuppliers = () => {
//   const [suppliers, setSuppliers] = useState([]);

//   // Fetch the initial suppliers data from Supabase
//   const fetchSuppliers = async () => {
//     const { data, error } = await supabase
//       .from('suppliers')
//       .select(`*`);

//     if (error) {
//       console.error('Error fetching suppliers:', error.message);
//     } else {
//       const formattedSuppliers = data.map(supplier => ({
//         supplier_id: supplier.supplier_id,
//         "Supplier Name": supplier["Supplier Name"],
//         Location: supplier.Location,
//         Email: supplier.Email,
//         // Products: supplier.products.map(product => product.product_name),
//         "Created At": supplier["Created At"]
//       }));
//       setSuppliers(formattedSuppliers);
//     }
//   };

//   useEffect(() => {
//     // Fetch initial data
//     fetchSuppliers();

//     // Subscribe to real-time changes in the 'suppliers' table
//     const subscription = supabase
//       .channel('public:suppliers')
//       .on(
//         'postgres_changes', 
//         { event: '*', schema: 'public', table: 'suppliers' }, 
//         () => {
//           // Fetch data again when changes happen
//           fetchSuppliers();
//         }
//       )
//       .subscribe();

//     // Unsubscribe on component unmount
//     return () => {
//       supabase.removeChannel(subscription);
//     };
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">View Suppliers</h1>
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Supplier ID</th>
//             <th className="py-2 px-4 border-b">Supplier Name</th>
//             <th className="py-2 px-4 border-b">Location</th>
//             <th className="py-2 px-4 border-b">Email</th>
//             <th className="py-2 px-4 border-b">Products</th>
//             <th className="py-2 px-4 border-b">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {suppliers.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="py-4 text-center">No suppliers available.</td>
//             </tr>
//           ) : (
//             suppliers.map((supplier) => (
//               <tr key={supplier.supplier_id}>
//                 <td className="py-2 px-4 border-b">{supplier.supplier_id}</td>
//                 <td className="py-2 px-4 border-b">{supplier["Supplier Name"]}</td>
//                 <td className="py-2 px-4 border-b">{supplier.Location}</td>
//                 <td className="py-2 px-4 border-b">{supplier.Email}</td>
//                 {/* <td className="py-2 px-4 border-b">
//                   {supplier.Products.join(', ')}
//                 </td> */}
//                 <td className="py-2 px-4 border-b">{new Date(supplier["Created At"]).toLocaleDateString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewSuppliers;
