import axios from "axios";
import { productRoutes } from "../routes/Product.routes";
import { storeService } from "./Store.service";

export const showProduct = async () => {
  try {
    const getToken = storeService.get("token");
    if (!getToken) {
      return { success: false, message: "Token is missing", isExpired: true };
    }

    const headers = { Authorization: `Bearer ${getToken}` };

    const response = await axios.get(productRoutes.show, { headers });

    if (response.data?.success) {
      return response.data;
    } else {
      return {
        success: false,
        message: response.data?.message || "Failed to show products",
        isExpired: response.data?.message === "Incorrect credentials",
      };
    }
  } catch (error) {
    if (error.response) {
      const failedResp = error.response.data;

      if (failedResp?.message === "Incorrect credentials") {
        return { success: false, message: "Incorrect credentials", isExpired: true };
      }

      return {
        success: false,
        message: failedResp?.message || "Failed to show products",
        isExpired: false,
      };
    }

    return { success: false, message: "Network error or server not reachable", isExpired: false };
  }
};

export const addProduct = async (data = {}) => {
  try {
    const getToken = storeService.get("token");
    if (getToken) {
      const headers = { Authorization: `Bearer ${getToken}` };

      const response = await axios.post(productRoutes.add, data, { headers });

      if (response.data?.success) {
        return response.data;
      } else {
        throw new Error(response.data?.message || "Failed to add product");
      }
    } else {
      throw new Error("Token is missing");
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to add product" };
  }
};

export const editProduct = async (data = {}) => {
  try {
    const getToken = storeService.get("token");
    if (getToken) {
      const headers = { Authorization: `Bearer ${getToken}` };
      console.log(data)
      const reqData = {
        name: data.name,
        description: data.description,
        price: data.price
      }
      const response = await axios.put(`${productRoutes.edit}/${data?.productId}`, reqData, { headers });

      if (response.data?.success) {
        return response.data;
      } else {
        throw new Error(response.data?.message || "Failed to edit product");
      }
    } else {
      throw new Error("Token is missing");
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to edit the product" };
  }
};

export const uploadProductImage = async (productId, image) => {
  try {
    const getToken = storeService.get("token");
    if (getToken) {
      const headers = { Authorization: `Bearer ${getToken}` };
      const response = await axios.post(`${productRoutes.uploadImg}/${productId}`, {image}, { headers });

      if (response.data?.success) {
        return response.data;
      } else {
        throw new Error(response.data?.message || "Failed to upload product image");
      }
    } else {
      throw new Error("Token is missing");
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "Failed to upload product image" };
  }
}
