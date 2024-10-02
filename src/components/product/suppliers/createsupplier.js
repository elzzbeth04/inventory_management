import React, { useState } from 'react';
import { supabase } from '../../../api/supabaseClient'; // Adjust path as needed

const CreateSupplier = () => {
  // State variables to hold the input values
  const [supplierName, setSupplierName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!supplierName || !location || !email) {
      alert('Please fill all the fields.');
      return;
    }

    // Construct supplier object
    const newSupplier = {
      supplier_name: supplierName,
      location: location,
      email: email,
    };

    setLoading(true);

    // Insert new supplier into the "suppliers" table in Supabase
    const { data, error } = await supabase
      .from('suppliers')
      .insert([newSupplier]);

    setLoading(false);

    if (error) {
      console.error('Error inserting supplier:', error.message);
      alert('Error adding supplier. Please try again.');
    } else {
      console.log('Supplier Created:', data);
      setSupplierName('');
      setLocation('');
      setEmail('');
      alert('Supplier Created Successfully');
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Supplier</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="supplierName">
              Supplier Name
            </label>
            <input
              type="text"
              id="supplierName"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="Enter supplier name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter supplier's location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter supplier's email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#003366] text-white rounded-lg hover:bg-[#004080] focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Creating Supplier...' : 'Create Supplier'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSupplier;
