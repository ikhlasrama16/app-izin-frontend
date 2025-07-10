import { toast } from "react-hot-toast";

export default function useToast() {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);
  const showInfo = (message) => toast.info(message);
  const showWarning = (message) => toast(message);

  return { showSuccess, showError, showInfo, showWarning };
}
