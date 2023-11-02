import { DefaultToastOptions, ToastOptions, ToastPosition, Toaster } from 'react-hot-toast';
import { CSSProperties } from 'styled-components';

interface IToast {
  position: ToastPosition;
  gutter: number;
  containerStyle: CSSProperties;
  toastOptions: DefaultToastOptions;
  success: ToastOptions;
  error: ToastOptions;
  style: CSSProperties | undefined;
}

const Toast = ({position, gutter, containerStyle, success, error, style}: IToast) => {
  return (
    <Toaster
      position={position}
      gutter={gutter}
      containerStyle={containerStyle}
      toastOptions={{
        success,
        error,
        style
      }}
    />
  );
};

Toast.defaultProps = {
  position: "top-center",
  gutter: 12,
  containerStyle: { margin: '8px', zIndex: 1 },
  success: {
    duration: 3000,
  },
  error:{
    duration: 5000,
  },
  style: {
    fontSize: '16px',
    maxWidth: '500px',
    padding: '16px 24px',
  }
}

export default Toast;
