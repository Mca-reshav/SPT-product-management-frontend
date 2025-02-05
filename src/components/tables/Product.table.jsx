import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";
import ChipAvatar from "../../contexts/ChipAvatar.context";
import UploadImageDialog from "../dialog/UploadImage.dialog";

const ProductTable = ({
  products,
  handleRequestSort,
  handleOpenEditDialog,
  rowsPerPage,
  page,
  handleUpdateProducts, 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openUploadImageDialog, setOpenUploadImageDialog] = useState(false);

  const handleClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUploadImageDialog = (product) => {
    setSelectedProduct(product);
    setOpenUploadImageDialog(true);
  };

  const handleCloseUploadImageDialog = () => {
    setOpenUploadImageDialog(false);
  };

  const handleImageUploadSuccess = (productId, imageUrl) => {
    const updatedProducts = products.map((product) =>
      product.productId === productId ? { ...product, image: imageUrl } : product
    );

    handleUpdateProducts(updatedProducts);

    handleCloseUploadImageDialog();
  };
  const fontColor = {color: "#fff !important" };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={fontColor}>Id</TableCell>
              <TableCell sx={fontColor}>Image</TableCell>
              <TableCell sx={fontColor}>Name</TableCell>
              <TableCell sx={fontColor}>Description</TableCell>
              <TableCell sx={fontColor}>Price</TableCell>
              <TableCell sx={fontColor}>Created By</TableCell>
              <TableCell sx={fontColor}>
                <TableSortLabel
                  active
                  onClick={(e) => handleRequestSort(e, "createdAt")}
                  sx={{ color: "#fff !important",whiteSpace: "nowrap" }}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell sx={fontColor}>Updated By</TableCell>
              <TableCell sx={{ color: "#fff !important", whiteSpace: "nowrap" }}>Updated At</TableCell>
              <TableCell sx={fontColor}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <TableRow key={product.productId}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt="Product"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    ) : (
                      "--"
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>Rs. {product.price}</TableCell>
                  <TableCell>
                    <ChipAvatar name={product.createdBy} />
                  </TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {product?.updatedBy ? (
                      <ChipAvatar name={product?.updatedBy} />
                    ) : (
                      "--"
                    )}
                  </TableCell>
                  <TableCell>
                    {product?.updatedAt
                      ? new Date(product?.updatedAt).toLocaleDateString()
                      : "--"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleClick(e, product)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleOpenEditDialog(selectedProduct);
                          handleClose();
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleOpenUploadImageDialog(selectedProduct);
                          handleClose();
                        }}
                      >
                        Upload Image
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UploadImageDialog
        open={openUploadImageDialog}
        onClose={handleCloseUploadImageDialog}
        product={selectedProduct}
        onImageUploadSuccess={handleImageUploadSuccess}
      />
    </>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleOpenEditDialog: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleUpdateProducts: PropTypes.func.isRequired, 
};

export default ProductTable;
