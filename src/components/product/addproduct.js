import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient'; // Adjust the path according to your folder structure

const AddUser = () => {
  const [user, setUser] = useState({
    productName: '',
    supplier: '',
    quantity: '',
    description: ''
  });

  const suppliers = [
    { id: 1, name: "AKJ Traders" },
    { id: 2, name: "JR Traders" },
    { id: 3, name: "PK Traders" },
    { id: 4, name: "Milton Suppliers" },
    { id: 5, name: "Nolta Suppliers" },
    { id: 6, name: "VStar Suppliers" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected supplier
    const selectedSupplier = suppliers.find(supplier => supplier.id === parseInt(user.supplier));

    // Check if the supplier exists
    if (!selectedSupplier) {
      console.error("Supplier not found");
      alert('Please select a valid supplier.');
      return;
    }

    // Insert the product into the database
    const { data, error } = await supabase
      .from('products') // Ensure this matches your table name
      .insert([
        {
          product_name: user.productName, // Use the correct field names
          supplier_id: selectedSupplier.id, // Use supplier ID from selected supplier
          supplier_name: selectedSupplier.name, // Use supplier name from selected supplier
          quantity: parseInt(user.quantity), // Convert to integer
          description: user.description,
        },
      ]);

    if (error) {
      console.error('Error inserting product:', error);
      alert('Error adding product. Please try again.');
    } else {
      console.log('Product inserted:', data);
      alert('Product added successfully!');

      // Reset the form
      setUser({
        productName: '',
        supplier: '',
        quantity: '',
        description: ''
      });
    }
  };

  return (
    <div className="bg-gray-200 p-5 rounded-lg max-w-lg mx-auto mt-12">
      <h2 className="text-xl font-bold mb-5">+ Create Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Dropdown */}
        <div className="mb-5">
          <label className="block mb-2 font-bold">Product Name</label>
          <select
            name="productName"
            value={user.productName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Product</option>
            <option value="Nestle">Nestle Bru</option>
            <option value="Colgate">Colgate Max Fresh</option>
            <option value="Yonex">Yonex bat</option>
            <option value="Milton">Milton Flask</option>
            <option value="Nolta">Nolta Casserole</option>
            <option value="VStar">Kitkat</option>
          </select>
        </div>

        {/* Supplier Dropdown */}
        <div className="mb-5">
          <label className="block mb-2 font-bold">Supplier Name</label>
          <select
            name="supplier"
            value={user.supplier}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div className="mb-5">
          <label className="block mb-2 font-bold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={user.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        {/* Description Input */}
        <div className="mb-5">
          <label className="block mb-2 font-bold">Description</label>
          <textarea
            name="description"
          <textarea
            name="description"
            value={user.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Submit Button moved to the bottom of the form */}
        <button
          type="submit"
          className="w-full bg-[#003366] text-white py-3 rounded transition duration-300 ease-in-out hover:bg-[#0059b3]"
        >
          + Add Product
        </button>
      </form>
    </div>
  );
};

export default AddUser;
