import { useContext } from "react";
import { LanguageContext } from "../stylesContext/LanguageContext";
import { LoadingContext } from "../toastContext/LoadingContext";
import { ToastContext } from "../toastContext/toastContext";
import { StylesContext } from "../stylesContext/StylesContext ";


export const useLoadingContext = () => useContext(LoadingContext);



/**
 * Custom hook that retrieves the labels from the LanguageContext.
 * @returns The labels object from the LanguageContext.
 */
export const useLabels = () => {
    const { labels } = useContext(LanguageContext);
    return labels;
};
export const useToast = () => useContext(ToastContext);



export const useStyles = () => useContext(StylesContext);
