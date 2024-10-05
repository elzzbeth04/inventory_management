import React from 'react';

const SupplierTable = ({ suppliers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-[#003366] text-white">
            <th className="py-2 px-4 text-left">Supplier Name</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Products</th>
            <th className="py-2 px-4 text-left">Created by</th>
            <th className="py-2 px-4 text-left">Created At</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-b">
              <td className="py-2 px-4">{supplier.supplier_name}</td>
              <td className="py-2 px-4">{supplier.location}</td>
              <td className="py-2 px-4">{supplier.email}</td>
              <td className="py-2 px-4">
                {/* Display product names associated with the supplier */}
                {supplier.products ? supplier.products.join(', ') : 'No products'}
              </td>
              <td className="py-2 px-4">{supplier.createdby}</td>
              <td className="py-2 px-4">
                {new Date(supplier.created_at).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">
                <button
                  className="bg-[#003366] hover:bg-[#004080] text-white py-1 px-3 rounded text-xs mr-2"
                  onClick={() => handleEdit(supplier.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-[#003366] hover:bg-[#004080] text-white py-1 px-3 rounded text-xs"
                  onClick={() => handleDelete(supplier.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Dummy functions for Edit and Delete actions
const handleEdit = (id) => {
  alert(`Edit supplier with ID: ${id}`);
};

const handleDelete = (id) => {
  alert(`Delete supplier with ID: ${id}`);
};

export default SupplierTable;
