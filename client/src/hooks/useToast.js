import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const toast = ({ title, description, variant = "default", duration = 5000 }) => {
    const id = generateId();
    const newToast = {
      id,
      title,
      description,
      variant,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss toast after duration
    setTimeout(() => {
      dismissToast(id);
    }, duration);

    return id;
  };

  // Remove a toast by ID
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toast,
    toasts,
    dismissToast,
  };
};

export default useToast; 