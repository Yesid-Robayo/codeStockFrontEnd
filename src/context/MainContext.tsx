import React, { useEffect, useState } from "react";
import { LABELS_ES } from "../constants/LABELS_ES";
import { LanguageContext } from "./stylesContext/LanguageContext";
import { STYLES } from "../styles/styles";
import { Toast, ToastContext } from "./toastContext/toastContext";
import { useSelector } from "react-redux";
import { Loading, LoadingContext } from "./toastContext/LoadingContext";
import { StylesContext } from "./stylesContext/StylesContext ";

/**
 * MainProvider component provides the main context for the application.
 * It manages the language context, toast context, and loading context.
 * @param children - The child components to be rendered within the MainProvider.
 */
export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  /* languageContext */
  const language = useSelector((state: any) => state.languaje.language);
  const [labels, setLabels] = useState(LABELS_ES);

  useEffect(() => {
    if (language === "es") {
      setLabels(LABELS_ES);
    } else if (language === "en") {
      setLabels(LABELS_ES);
    } else {
      setLabels(LABELS_ES);
    }
  }, [language]);

  /* toastContext */
  const [toast, setToast] = useState(null);

  /**
   * Displays a toast message for a specified duration.
   * @param message - The message to be displayed in the toast.
   */
  const showToast = (message: any) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  /* loadingContext */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sets the isLoading state to true, indicating that the application is currently loading.
   */
  const startLoading = () => setIsLoading(true);

  /**
   * Sets the isLoading state to false, indicating that the application has finished loading.
   */
  const stopLoading = () => setIsLoading(false);

  return (
    <StylesContext.Provider value={STYLES}>
      <LanguageContext.Provider value={{ language, labels }}>
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
          {isLoading && <Loading />}
          <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && <Toast message={toast} />}
          </ToastContext.Provider>
        </LoadingContext.Provider>
      </LanguageContext.Provider>
    </StylesContext.Provider>
  );
};
