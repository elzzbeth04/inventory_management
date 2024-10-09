import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient'; // Adjust path as needed

const CreateSupplier = () => {
  // State variables to hold the input values
  const [supplierName, setSupplierName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
      setOpenSnackbar(true); // Open snackbar on success
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

        {/* Snackbar */}
        {openSnackbar && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
            Supplier Created Successfully!
            <button onClick={handleCloseSnackbar} className="ml-4">X</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSupplier;





/*import React, { useState } from 'react';

const CreateOrder = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const productOptions = ['Neslte bru', 'Colgate Max Fresh', 'Yonex bat', 'Milton Flask', 'Nolta Casserole', 'Kitkat'];
  const supplierOptions = ['AKJ Traders', 'JR Traders', 'PK Traders', 'Milton Suppliers', 'Nolta Suppliers', 'VStar Suppliers'];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!productName || !quantity || !supplierName) {
      alert('Please fill all the fields.');
      return;
    }
    
    const newOrder = {
      product: productName,
      quantity: quantity,
      supplier: supplierName,
    };

    console.log('Order Created:', newOrder);
    
    setOpenSnackbar(true);

    setProductName('');
    setQuantity('');
    setSupplierName('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          
          
          <div className="flex-1">
            <label className="block text-gray-700">Product Name</label>
            <select
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full p-2 border rounded-md text-gray-400"
            >
              <option value="">Select a product</option>
              {productOptions.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          
          <div className="flex-1">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        
        <div className="flex-1">
          <label className="block text-gray-700">Supplier Name</label>
          <select
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
            className="w-full p-2 border rounded-md text-gray-400"
          >
            <option value="">Select a supplier</option>
            {supplierOptions.map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
        </div>

       
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800"
        >
          Create Order
        </button>
      </form>

      
      {openSnackbar && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
          Order Successfully Created!
          <button  onClick={handleCloseSnackbar} className="ml-4">X</button>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;*/
