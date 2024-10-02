import React, { useState } from 'react';

const AddUser = () => {
  const [user, setUser] = useState({
    productName: '',
    supplier: '',
    createdAt: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="bg-gray-200 p-5 rounded-lg max-w-lg mx-auto mt-12">
      {/* Separate heading */}
      <h2 className="text-xl font-bold mb-5">+ Create Product</h2>

      {/* Form */}
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
            <option value="AKJ Traders">AKJ Traders</option>
            <option value="JR Traders">JR Traders</option>
            <option value="PK Traders">PK Traders</option>
            <option value="Milton Suppliers">Milton Suppliers</option>
            <option value="Nolta Suppliers">Nolta Suppliers</option>
            <option value="VStar Suppliers"> Robinson </option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-bold">Quantity</label>
          <input
            type="text"
            name="createdAt"
            value={user.createdAt}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-5">
          <label className="block mb-2 font-bold">Description</label>
          <textarea
            name="description"
            value={user.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
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

export default AddUser;
