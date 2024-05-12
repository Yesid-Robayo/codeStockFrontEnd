import { createContext } from 'react';

export const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => { },
  stopLoading: () => { },
});


export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
};

