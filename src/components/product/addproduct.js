import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient'; // Adjust the path according to your folder structure

const AddProduct = ({ onProductAdded }) => { // Added onProductAdded prop
  const [product, setProduct] = useState({
    productName: '',
    supplier: '',
    quantity: '',
    description: ''
  });

  const [suppliers, setSuppliers] = useState([]); // Fetch suppliers from DB

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*');

      if (error) {
        console.error('Error fetching suppliers:', error);
        alert('Failed to load suppliers. Please try again.');
      } else {
        setSuppliers(data);
      }
    };

    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected supplier
    const selectedSupplier = suppliers.find(supplier => supplier.id === parseInt(product.supplier));

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
          product_name: product.productName, // Use the correct field names
          supplier_id: selectedSupplier.id, // Use supplier ID from selected supplier
          quantity: parseInt(product.quantity), // Convert to integer
          description: product.description,
        },
      ]);

    if (error) {
      console.error('Error inserting product:', error);
      alert('Error adding product. Please try again.');
    } else {
      console.log('Product inserted:', data);
      alert('Product added successfully!');

      // Reset the form
      setProduct({
        productName: '',
        supplier: '',
        quantity: '',
        description: ''
      });

      // Notify parent component to update the product list
      if (onProductAdded) {
        onProductAdded();
      }
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
            value={product.productName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Product</option>
            <option value="Nestle">Nestle Bru</option>
            <option value="Colgate">Colgate Max Fresh</option>
            <option value="Yonex">Yonex Bat</option>
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
            value={product.supplier}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.supplier_name}</option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div className="mb-5">
          <label className="block mb-2 font-bold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            min="1"
          />
        </div>
        
        {/* Description Input */}
        <div className="mb-5">
          <label className="block mb-2 font-bold">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        {/* Submit Button */}
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

export default AddProduct;
