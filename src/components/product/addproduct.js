import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient'; // Adjust the path according to your folder structure

const AddProduct = ({ onProductAdded }) => { 
  const [product, setProduct] = useState({
    productName: '',
    supplier: '',
    quantity: '',
    description: ''
  });

  const [suppliers, setSuppliers] = useState([]); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Custom message for Snackbar

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*');

      if (error) {
        console.error('Error fetching suppliers:', error);
        setSnackbarMessage('Failed to load suppliers. Please try again.');
        setOpenSnackbar(true);
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
    console.log("Product Name:", product.productName);
    
    const selectedSupplier = suppliers.find(supplier => supplier.id === parseInt(product.supplier));

    if (!selectedSupplier) {
      setSnackbarMessage('Please select a valid supplier.');
      setOpenSnackbar(true);
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          product_name: product.productName,
          supplier_id: selectedSupplier.id,
          quantity: parseInt(product.quantity),
          description: product.description,
        },
      ]);

    if (error) {
      console.error('Error inserting product:', error);
      setSnackbarMessage('Error adding product. Please try again.');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Product added successfully!');
      setOpenSnackbar(true);
      setProduct({
        productName: '',
        supplier: '',
        quantity: '',
        description: ''
      });

      if (onProductAdded) {
        onProductAdded();
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-5">
        <h2 className="text-xl font-bold mb-5">Create Product</h2>
    
        <form onSubmit={handleSubmit}>
          {/* Product Name Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor="productName">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
      
          {/* Supplier Dropdown */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor="supplier">
              Supplier Name
            </label>
            <select
              id="supplier"
              name="supplier"
              value={product.supplier}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
          </div>
      
          {/* Quantity Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
              placeholder="Enter Quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              min="1"
            />
          </div>
      
          {/* Description Input */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              placeholder="Enter Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>
      
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#003366] text-white rounded-lg hover:bg-[#004080] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            + Add Product
          </button>
        </form>

        {/* Snackbar */}
        {openSnackbar && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
            {snackbarMessage}
            <button onClick={handleCloseSnackbar} className="ml-4">X</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
