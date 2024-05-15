import { useSelector } from "react-redux";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { UserAPI } from "../../services/UserAPI";
import { userData } from "../../utils/utilsDTOS";

/**
 * Returns the logic for the ProfilePage component.
 * @returns An object containing the labels, styles, userAPI, userData, and dateConverter.
 */
export const ProfilePageLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const userAPI = UserAPI;
    const userData: userData = useSelector((state: any) => state.auth.user);

    /**
     * Converts a date string to a formatted date string.
     * @param date - The date string to convert.
     * @returns The formatted date string (DD/MM/YYYY).
     */
    const dateConverter = (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    }

    return { labels, styles, userAPI, userData, dateConverter };
}