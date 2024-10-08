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
    <div className="p-5 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4 ml-4">List of Products</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg ml-4">
        <table className="min-w-full">
          <thead >
            <tr className="bg-[#003366] text-white">
            <th className="py-2 px-4 border-b text-left ">Product Name</th>

              <th className="py-2 px-4 border-b text-left">Qty</th>
              <th className="py-2 px-4 border-b text-left">Supplier</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              // Find the supplier name using the supplier ID
              const supplier = suppliers.find((sup) => sup.id === product.supplier_id);
              const supplierDisplay = supplier ? supplier.supplier_name : 'Unknown';

              return (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{product.product_name}</td>
                  <td className="py-2 px-4">{product.quantity}</td>
                  <td className="py-2 px-4">{supplierDisplay}</td>
                  <td className="py-2 px-4">
                    {new Date(product.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">{product.description}</td>
                  <td className="py-2 px-4 flex space-x-2">
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
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="product_name"
            value={selectedProduct?.product_name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Supplier"
            name="supplier_id"
            value={selectedProduct?.supplier_id || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.supplier_name}
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
