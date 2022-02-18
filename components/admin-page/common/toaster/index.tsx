import { useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export function useToaster() {
  const burnSuccessToast = useCallback((msg: string) => {
    toast.success(`🦄 ${msg}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  return { burnSuccessToast };
}
function Toaster() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
export default Toaster;
