import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { supabase } from '../../api/supabaseClient'; // Adjust the path according to your folder structure
import '../../App.css';
import '../../index.css';

// **Suppliers array for mapping IDs to names**
const suppliers = [
  { id: 1, name: 'AKJ Traders' },
  { id: 2, name: 'JR Traders' },
  { id: 3, name: 'PK Traders' },
  { id: 4, name: 'Milton Suppliers' },
  { id: 5, name: 'Nolta Suppliers' },
  { id: 6, name: 'VStar Suppliers' },
];

const ViewUser = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // Handle edit button click
  const handleEditClick = (index) => {
    setSelectedProduct({ ...products[index], index });
    setOpen(true);
  };

  // Handle delete button click
  const handleDelete = async (index) => {
    const productToDelete = products[index];

    const { error } = await supabase.from('products').delete().match({ id: productToDelete.id }); // Use your primary key

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = async () => {
    const updatedProducts = [...products];
    const { error } = await supabase
      .from('products')
      .update({
        product_name: selectedProduct.product_name, // Ensure this is the correct field
        supplier_id: selectedProduct.supplier, // Ensure this is the correct field
        quantity: selectedProduct.quantity,
        description: selectedProduct.description,
      })
      .match({ id: selectedProduct.id }); // Use your primary key

    if (error) {
      console.error('Error updating product:', error);
    } else {
      updatedProducts[selectedProduct.index] = selectedProduct;
      setProducts(updatedProducts);
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  return (
    <div className="user-list-container p-8">
      <h2 className="text-xl font-semibold mb-4">List of Products</h2>
      <table className="min-w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-[#003366] text-white">
            <th className="border border-gray-500 px-1 py-2 text-center">Product Name</th>
            <th className="border border-gray-500 px-1 py-2 text-center">Qty</th>
            <th className="border border-gray-500 px-1 py-2 text-center">Supplier</th>
            <th className="border border-gray-500 px-1 py-2 text-center">Created At</th>
            <th className="border border-gray-500 px-1 py-2 text-center">Description</th>
            <th className="border border-gray-500 px-1 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            // **Find the supplier name using the supplier ID**
            const supplier = suppliers.find(sup => sup.id === product.supplier_id);
            const supplierDisplay = supplier ? supplier.name : 'Unknown'; // Fallback for supplier

            return (
              <tr key={product.id} className="border-b"> {/* Use unique ID */}
                <td className="border border-gray-500 px-1 py-2 text-center">{product.product_name}</td>
                <td className="border border-gray-500 px-1 py-2 text-center">{product.quantity}</td>
                <td className="border border-gray-500 px-1 py-2 text-center">{supplierDisplay}</td> {/* Display supplier name */}
                <td className="border border-gray-500 px-1 py-2 text-center">{new Date(product.created_at).toLocaleString()}</td> {/* Format timestamp */}
                <td className="border border-gray-500 px-1 py-2 text-center">{product.description}</td>
                <td className="border border-gray-500 px-1 py-2 text-center">
                  <IconButton color="primary" aria-label="delete" size="small" onClick={() => handleDelete(index)}>
                    <DeleteIcon fontSize="small" style={{ color: 'red' }} />
                  </IconButton>
                  <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEditClick(index)}>
                    <EditIcon fontSize="small" style={{ color: 'grey' }} />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="product_name" // Ensure this matches your product model
            value={selectedProduct?.product_name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Supplier"
            name="supplier"
            value={selectedProduct?.supplier || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select // Use dropdown for suppliers
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={selectedProduct?.quantity || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={selectedProduct?.description || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewUser;
