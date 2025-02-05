import axios from "axios";
import { userRoutes } from "../routes/User.routes";
import { storeService } from "./Store.service";

export const userLogin = async (reqData = {}) => {
  try {
    const response = await axios.post(userRoutes.login, { ...reqData });
    const { success, message, data } = response.data;
    if (success) storeService.set("token", data);
    return { success, message };
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "User login failed" };
  }
};

export const userRegistration = async (data = {}) => {
  try {
    const response = await axios.post(userRoutes.register, { ...data });
    const { success, message } = response.data;
    return { success, message };
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "User registration failed" };
  }
};

export const userProfile = async () => {
  try {
    const getToken = storeService.get("token");
    if (getToken) {
      const headers = { Authorization: `Bearer ${getToken}` };
      const response = await axios.get(userRoutes.profile, { headers });
      return response.data;
    } else {
      const response = { success: false, message: "Token missing" };
      return response;
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "User Profile failed to load" };
  }
};
