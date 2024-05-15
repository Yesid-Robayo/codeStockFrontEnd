import { useNavigate } from "react-router-dom";
import { useLabels, useStyles } from "../../hooks/contextHooks";

/**
 * Returns an object containing the styles, labels, and navigateToPath function for the home page.
 * @returns An object with the styles, labels, and navigateToPath function.
 */
export const HomePageLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const navigate = useNavigate();

    /**
     * Navigates to the specified path.
     * @param path - The path to navigate to.
     */
    const navigateToPath = (path: string) => navigate(path);

    return {
        styles,
        labels,
        navigateToPath
    };
};