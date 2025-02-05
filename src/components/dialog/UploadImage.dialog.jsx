import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { PhotoCamera } from "@mui/icons-material";
import PropTypes from "prop-types";
import { uploadProductImage } from "../../services/Product.service";
import { ToastService } from "../../services/Toaster.service";

const UploadImageDialog = ({
  open,
  onClose,
  product,
  onImageUploadSuccess,
}) => {
  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const response = await uploadProductImage(product.productId, image);
      if (onImageUploadSuccess) onImageUploadSuccess(product.productId, response);
      if (response.success) {
        onClose();
        ToastService.success("Product image uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Product Image</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
        }}
      >
        <input
          accept="image/*"
          id="product-image-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="product-image-upload">
          <IconButton color="primary" component="span">
            <PhotoCamera />{" "}
            <span style={{ fontSize: "medium", marginLeft: "5px" }}>
              Choose an image
            </span>
          </IconButton>
        </label>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpload} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UploadImageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
  }).isRequired,
  onImageUploadSuccess: PropTypes.func,
};

export default UploadImageDialog;
