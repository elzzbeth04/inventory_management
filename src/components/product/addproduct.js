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
        <div className="mb-5">
          <label className="block mb-2 font-bold">Product Name</label>
          <input
            type="text"
            name="productName" // Changed this to match state
            value={user.productName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-bold">Supplier Name</label>
          <input
            type="text"
            name="supplier" // Changed this to match state
            value={user.supplier}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-bold">Created At</label>
          <input
            type="text" // Changed from email to text for clarity
            name="createdAt" // Changed this to match state
            value={user.createdAt}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-bold">Description</label>
          <textarea // Changed input to textarea for description
            name="description" // Changed this to match state
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
