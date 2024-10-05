import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { supabase } from '../../api/supabaseClient'; // Adjust the path according to your folder structure
import '../../App.css';
import '../../index.css';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    };

    // Fetch suppliers
    const fetchSuppliers = async () => {
      const { data, error } = await supabase.from('suppliers').select('*');
      if (error) {
        console.error('Error fetching suppliers:', error);
      } else {
        setSuppliers(data);
      }
    };

    fetchProducts();
    fetchSuppliers();
  }, []);

  // Handle edit button click
  const handleEditClick = (index) => {
    setSelectedProduct({ ...products[index], index });
    setOpen(true);
  };

  // Handle delete button click
  const handleDelete = async (index) => {
    const product = products[index];
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id);

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
    const { id, product_name, supplier_id, quantity, description } = selectedProduct;
    const { error } = await supabase
      .from('products')
      .update({ product_name, supplier_id, quantity, description })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
    } else {
      const updatedProducts = [...products];
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
    <div className="product-list-container p-0">
      <h2 className="text-xl font-semibold mb-0">List of Products</h2>
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
            // Find the supplier name using the supplier ID
            const supplier = suppliers.find((sup) => sup.id === product.supplier_id);
            const supplierDisplay = supplier ? supplier.name : 'Unknown'; // Fallback for supplier

            return (
              <tr key={product.id} className="border-b">
                <td className="border border-gray-500 px-1 py-2 text-center">{product.product_name}</td>
                <td className="border border-gray-500 px-1 py-2 text-center">{product.quantity}</td>
                <td className="border border-gray-500 px-1 py-2 text-center">{supplierDisplay}</td>
                <td className="border border-gray-500 px-1 py-2 text-center">
                  {new Date(product.created_at).toLocaleString()}
                </td>
                <td className="border border-gray-500 px-1 py-2 text-center">{product.description}</td>
                <td className="border border-gray-500 px-1 py-2 text-center">
                  <IconButton
                    color="primary"
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon fontSize="small" style={{ color: 'red' }} />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEditClick(index)}
                  >
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
            name="supplier_id" // Match the database field
            value={selectedProduct?.supplier_id || ''}
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

export default ViewProduct;
