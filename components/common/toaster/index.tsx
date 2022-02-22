import { useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const globalToastSettings = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export function useToaster() {
  const burnSuccessToast = useCallback((msg: string) => {
    toast.success(`🦄 ${msg}`, globalToastSettings);
  }, []);

  return { burnSuccessToast };
}
function Toaster() {
  return (
    <ToastContainer
      position={toast.POSITION.BOTTOM_RIGHT}
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
