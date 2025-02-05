import { useState, useEffect } from "react";
import { Box, TextField, IconButton, TablePagination } from "@mui/material";
import { Search, AddBox, RefreshTwoTone } from "@mui/icons-material";
import { showProduct } from "../services/Product.service";
import { ToastService } from "../services/Toaster.service";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ProductTable from "../components/tables/Product.table";
import AddProductDialog from "../components/dialog/AddProduct.dialog";
import EditProductDialog from "../components/dialog/EditProduct.dialog";
import { useProductContext } from "../contexts/Product.context";
import moment from "moment";
import UploadImageDialog from "../components/dialog/UploadImage.dialog";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const Home = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openUploadImageDialog, setOpenUploadImageDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, setProducts, filteredProducts, setFilteredProducts } =
    useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await showProduct();
        const { success, message } = response;
        const sessionExpired = message === "Incorrect credentials";
        if (success) {
          const data = response?.data?.data;
          setProducts(data);
          setFilteredProducts(data);
        } else if (!success && sessionExpired) {
          ToastService.info("Session expired");
        } else {
          ToastService.error("Failed to load products");
        }
      } catch (error) {
        ToastService.error("Catch Error to load products", error);
      }
    };
    fetchProducts();
  }, [setProducts, setFilteredProducts]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filteredData);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const filteredData = products.filter((product) => {
      const productDate = moment(product.createdAt).format("YYYY-MM-DD");
      const selectedDateFormatted = moment(date).format("YYYY-MM-DD");

      return selectedDateFormatted === productDate;
    });

    setFilteredProducts(filteredData);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (product) => {
    setSelectedProduct(product); 
    setOpenEditDialog(true);
  };
  
  const handleRefreshTable = async () => {
    try {
      const response = await showProduct();
      if (response.success) {
        const data = response?.data?.data;
        setProducts(data);
        setFilteredProducts(data);
      } else {
        ToastService.error("Failed to refresh products");
      }
    } catch (error) {
      ToastService.error("Error refreshing products", error);
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddProduct = () => {
    ToastService.success("Product added successfully!");
    setOpenAddDialog(false);
  };

  const handleUpdateProduct = async () => {
    ToastService.success("Product updated successfully!");

    const response = await showProduct(); 
    const data = response?.data?.data;
    setProducts(data);
    setFilteredProducts(data);

    setOpenEditDialog(false); 
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProduct(null);
  };
  const handleUpdateProducts = (updatedProducts) => {
    setProducts(updatedProducts); 
  };
  const handleOpenUploadImageDialog = (product) => {
    setSelectedProduct(product);
    setOpenUploadImageDialog(true);
  };

  const handleCloseUploadImageDialog = () => {
    setOpenUploadImageDialog(false);
    setSelectedProduct(null);
  };

  const handleImageUploadSuccess = (productId, newImage) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, image: newImage }
          : product
      )
    );
  };

  const sortedProducts = filteredProducts.sort(getComparator(order, orderBy));
  const tableFilters = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "end",
    gap: "1rem",
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
        sx={tableFilters}
      >
        <IconButton
          onClick={handleOpenAddDialog}
          color="primary"
          sx={{ border: "1px solid", borderRadius: "5px" }}
        >
          <AddBox />
          <label style={{ fontSize: "medium", marginLeft: "5px" }}>Add</label>
        </IconButton>

        <IconButton
          onClick={handleRefreshTable}
          color="primary"
          sx={{ border: "1px solid", borderRadius: "5px" }}
        >
          <RefreshTwoTone />
          <label style={{ fontSize: "medium", marginLeft: "5px" }}>
            Refresh
          </label>
        </IconButton>
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearch}
          value={searchQuery}
          sx={{ width: "300px" }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            placeholderText="Select Date"
            dateFormat="yyyy/MM/dd"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>

      <ProductTable
        products={sortedProducts}
        handleRequestSort={handleRequestSort}
        handleOpenEditDialog={handleOpenEditDialog}
        rowsPerPage={rowsPerPage}
        page={page}
        handleUpdateProducts={handleUpdateProducts} 
        handleOpenUploadImageDialog={handleOpenUploadImageDialog}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AddProductDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        onAdd={handleAddProduct}
      />
     
      <EditProductDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        product={selectedProduct} 
        onUpdate={handleUpdateProduct}
      />

      <UploadImageDialog
        open={openUploadImageDialog}
        onClose={handleCloseUploadImageDialog}
        product={selectedProduct}
        onImageUploadSuccess={handleImageUploadSuccess}
      />
    </Box>
  );
};

export default Home;
