import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastService = {
  success: (message) => toast.success(message, { position: "top-right" }),
  info: (message) => toast.info(message, { position: "top-right" }),
  error: (message) => toast.error(message, { position: "top-right" }),
};
