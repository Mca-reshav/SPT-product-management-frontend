import { useState, useCallback } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useProductContext } from "../../contexts/Product.context";
import { addProduct, showProduct } from "../../services/Product.service";
import { ToastService } from "../../services/Toaster.service";

const AddProductDialog = ({ open, onClose }) => {
  const { newProduct, setNewProduct, setProducts, setFilteredProducts } = useProductContext();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAdd = useCallback(async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      ToastService.error("All fields are required.");
      return;
    }
    setLoading(true);

    try {
      const response = await addProduct(newProduct); 
      if (response.success) {
        ToastService.success("Product added successfully!");

        const updatedProducts = await showProduct();
        setProducts(updatedProducts.data.data);
        setFilteredProducts(updatedProducts.data.data);

        setNewProduct({ name: "", description: "", price: "" }); 
        onClose();
      } else {
        ToastService.error(response.message || "Failed to add product.");
      }
    } catch (error) {
      ToastService.error("Error adding product. Please try again.");
      console.error("Add Product Error:", error);
    } finally {
      setLoading(false);
    }
  }, [newProduct, setProducts, setFilteredProducts, setNewProduct, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          fullWidth
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleAdd} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddProductDialog;
