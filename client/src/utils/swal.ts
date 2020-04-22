interface AlertProps {
  type: 'success' | 'error' | 'warning';
  title: string;
  text: string;
}

export const alertProp = (data: AlertProps) => {
  return {
    type: data.type,
    title: data.title,
    confirmButtonColor: '#4ea5d9',
    text: data.text,
  };
};

interface ConfirmData {
  title: string;
  text?: string;
  confirmButtonText: string;
}

interface ConfirmationModal {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question' | undefined;
  showCancelButton: boolean;
  confirmButtonColor: string;
  cancelButtonColor: string;
  confirmButtonText: string;
}
export const confirmationAlert = (data: ConfirmData): ConfirmationModal => {
  return {
    title: data.title,
    text: data.text || "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4ea5d9',
    cancelButtonColor: '#d33',
    confirmButtonText: data.confirmButtonText,
  };
};
