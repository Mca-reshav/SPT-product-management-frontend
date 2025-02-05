import { useState, useEffect} from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useProductContext } from "../../contexts/Product.context";
import { editProduct, showProduct } from "../../services/Product.service";
import { ToastService } from "../../services/Toaster.service";

const EditProductDialog = ({ open, onClose, product }) => {
  const { setProducts, setFilteredProducts } = useProductContext();
  
  const [editedProduct, setEditedProduct] = useState(product || { name: "", description: "", price: "" });

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await editProduct(editedProduct);
      if (response.success) {
        ToastService.success("Product updated successfully!");

        const updatedProducts = await showProduct();
        setProducts(updatedProducts.data.data);
        setFilteredProducts(updatedProducts.data.data);

        onClose();
      } else {
        ToastService.error(response.message || "Failed to update product.");
      }
    } catch (error) {
      ToastService.error("Error updating product.", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={editedProduct.price}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdate} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

EditProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.any.isRequired
};

export default EditProductDialog;

