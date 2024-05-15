import { useState } from "react";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { UserAPI } from "../../services/UserAPI";

/**
 * Represents the logic for the register component.
 * @param onChangeLogin - The function to be called when the login changes.
 * @returns An object containing the necessary data and functions for the register component.
 */
export const RegisterLogic = ({ onChangeLogin }: { onChangeLogin: () => void }) => {
    const labels = useLabels();
    const styles = useStyles();
    const toast = useToast();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: null as Date | null, // Changed to null to work with react-datepicker
        gender: "",
        phoneNumber: "",
        email: "",
        password: ""
    });

    /**
     * Handles the change event for input fields.
     * @param e - The event object.
     */
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Handles the change event for the birth date field.
     * @param date - The selected date.
     */
    const handleDateChange = (date: Date | null) => {
        setFormData({
            ...formData,
            birthDate: date
        });
    };

    /**
     * Handles the change event for the gender field.
     * @param selectedOption - The selected option.
     */
    const handleGenderChange = (selectedOption: any) => {
        setFormData({
            ...formData,
            gender: selectedOption.value
        });
    };

    /**
     * Creates a new user.
     */
    const createUser = async () => {
        try {
            if (formData.firstName === "" || formData.lastName === "" || formData.birthDate === null || formData.email === "" || formData.password === "" || formData.gender === "" || formData.phoneNumber === "") {
                toast.showToast(labels.requiredAllFields);
                return;
            }
            if (!formData.email.includes('@')) {
                toast.showToast(labels.emailNotValid);
                return;
            }

            UserAPI.createUser({
                name: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: formData.birthDate,
                email: formData.email,
                gender: formData.gender,
                password: formData.password,
                phone: formData.phoneNumber,
                username: formData.phoneNumber,
            })
                .then((response: any) => {
                    if (response.statusCode !== 200) {
                        toast.showToast(labels.errorCreatingUser);
                    } else {
                        toast.showToast(labels.userCreated);
                        setFormData({
                            firstName: "",
                            lastName: "",
                            birthDate: null,
                            email: "",
                            password: "",
                            gender: "",
                            phoneNumber: "",
                        });
                        onChangeLogin();
                    }

                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    toast.showToast(labels.errorCreatingUser);
                });
        } catch (error) {
            toast.showToast(`${labels.errorCreatingUser}`);
        }
    };

    const { firstName, lastName, birthDate, gender, phoneNumber, email, password } = formData;

    return {
        styles,
        labels,
        createUser,
        firstName,
        lastName,
        birthDate,
        handleChange,
        handleDateChange,
        handleGenderChange,
        gender,
        phoneNumber,
        email,
        password
    };
}