import { useDispatch, useSelector } from "react-redux";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../utils/utilsDTOS";
import { authReducer } from "../../redux/reducers/authReducer";
import { orderReducer } from "../../redux/reducers/orderReducer";

/**
 * Returns an object containing the logic and state variables for the NavTab component.
 * @returns An object with the following properties:
 *   - labels: The labels object obtained from the useLabels hook.
 *   - styles: The styles object obtained from the useStyles hook.
 *   - isAutenticaded: A boolean indicating whether the user is authenticated.
 *   - userData: The user data obtained from the useSelector hook.
 *   - navigateToPath: A function that navigates to the specified path.
 *   - toggleMenu: A function that toggles the menu open/close state.
 *   - closeSesion: A function that logs out the user, removes all orders, and displays a success toast message.
 *   - isOpen: A boolean indicating whether the menu is open or closed.
 */
export const NavTabLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();
    const isAutenticaded = useSelector((state: any) => state.auth.isAuthenticated);
    const userData: userData = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();
    const closeSesion = () => {
        navigate('/home');
        dispatch(authReducer.actions.logOut());
        dispatch(orderReducer.actions.removeAllOrders());
        setIsOpen(false);
        toast.showToast(labels.logOutSuccess);
    }
    const navigateToPath = (path: string) => {
        navigate(path);
        setIsOpen(false);
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return {
        labels,
        styles,
        isAutenticaded,
        userData,
        navigateToPath,
        toggleMenu,
        closeSesion,
        isOpen
    };
}