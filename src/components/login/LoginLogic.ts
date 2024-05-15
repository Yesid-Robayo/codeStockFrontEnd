import { useNavigate } from "react-router-dom";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { UserAPI } from "../../services/UserAPI";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { authReducer } from "../../redux/reducers/authReducer";

/**
 * Represents the logic for the login component.
 * @returns An object containing the loginForAccess function, handleChange function, email, password, labels, and styles.
 */
export const LoginLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const userApi = UserAPI;
    const navigator = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    /**
     * Handles the login process by sending a request to the server with the provided email and password.
     * If the login is successful, it dispatches the login action and redirects to the home page.
     * Otherwise, it displays an error toast.
     */
    const loginForAccess = async () => {
        if (formData.email && formData.password) {
            try {
                const response = await userApi.login(formData.email, formData.password);
                if (response) {
                    dispatch(authReducer.actions.login(response));
                    toast.showToast(labels.loginSuccess);
                    navigator('/home');
                }
            } catch (error) {
                toast.showToast(labels.errorLogin);
            }
        } else {
            toast.showToast(labels.requiredAllFields);
        }
    };

    /**
     * Handles the change event for the input fields.
     * Updates the formData state with the new values.
     * @param e - The event object.
     */
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { email, password } = formData;

    return {
        loginForAccess,
        handleChange,
        email,
        password,
        labels,
        styles
    };
};
