import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';  

const CreateOrder = () => {
  const [productId, setProductId] = useState(''); // Store product_id instead of productName
  const [quantity, setQuantity] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]); // Fetch product options from the DB
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch suppliers and products from Supabase
  const fetchSuppliersAndProducts = async () => {
    // Fetch suppliers
    const { data: suppliers, error: supplierError } = await supabase
      .from('suppliers')
      .select('supplier_name');
    
    if (supplierError) {
      console.error('Error fetching suppliers:', supplierError.message);
    } else {
      setSupplierOptions(suppliers.map(supplier => supplier.supplier_name));
    }

    // Fetch products
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('id, product_name');
    
    if (productError) {
      console.error('Error fetching products:', productError.message);
    } else {
      setProductOptions(products); // Set the product options for the dropdown
    }
  };

  useEffect(() => {
    // Fetch supplier and product options when component mounts
    fetchSuppliersAndProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productId || !quantity || !supplierName) {
      alert('Please fill all the fields.');
      return;
    }

    const newOrder = {
      product_id: productId,  // Store the product_id instead of product name
      quantity: parseInt(quantity),
      supplier: supplierName,
      status: 'Pending',  
      ordered_by: 'User A',  
      delivery_history: 'Pending',  
    };

    const { data, error } = await supabase
      .from('purchase_orders')
      .insert([newOrder]);

    if (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    } else {
      console.log('Order created:', data);
      setOpenSnackbar(true);
    }

    setProductId('');
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
          {/* Product Name Select */}
          <div className="flex-1">
            <label className="block text-gray-700">Product Name</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="w-full p-2 border rounded-md text-gray-400"
            >
              <option value="">Select a product</option>
              {productOptions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
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

        {/* Supplier Name Select */}
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

        <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800">
          Create Order
        </button>
      </form>

      {openSnackbar && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
          Order Successfully Created!
          <button onClick={handleCloseSnackbar} className="ml-4">X</button>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;



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
