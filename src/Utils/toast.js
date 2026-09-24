import useAppStore from "../Store/useAppStore";

export const toast = {
  success: (message) => useAppStore.getState().pushToast(message, "success"),
  error: (message) => useAppStore.getState().pushToast(message, "error"),
};
