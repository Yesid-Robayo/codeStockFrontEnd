import { useContext } from "react";
import { LanguageContext } from "../context/stylesContext/LanguageContext";
import { StylesContext } from "../context/stylesContext/StylesContext ";
import { ToastContext } from "../context/toastContext/toastContext";
import { LoadingContext } from "../context/toastContext/LoadingContext";


export const useLoadingContext = () => useContext(LoadingContext);



/**
 * Custom hook to access the labels from the LanguageContext.
 * @returns The labels object from the LanguageContext.
 */
export const useLabels = () => {
    const { labels } = useContext(LanguageContext);
    return labels;
};
export const useToast = () => useContext(ToastContext);



export const useStyles = () => useContext(StylesContext);
