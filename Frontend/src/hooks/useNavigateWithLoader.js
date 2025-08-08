import { useNavigate } from 'react-router-dom';
import { useLoading } from '../hooks/useLoading';

export const useNavigateWithLoader = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoading();

  const navigateWithLoader = (path, options = {}) => {
    const { 
      message = 'LOADING YOUR EXPERIENCE',
      duration = 2000,
      skipLoader = false 
    } = options;

    if (!skipLoader) {
      showLoader(message);
      
      // Simulate loading time then navigate
      setTimeout(() => {
        navigate(path);
        setTimeout(() => {
          hideLoader();
        }, 500); // Small delay after navigation
      }, duration);
    } else {
      navigate(path);
    }
  };

  return { navigateWithLoader, navigate, showLoader, hideLoader };
};
