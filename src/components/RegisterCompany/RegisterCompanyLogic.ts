import { useState } from "react";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";

/**
 * Logic for the RegisterCompany component.
 * @returns An object containing the necessary functions and data for the component.
 */
export const RegisterCompanyLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const toast = useToast();
    const companyAPi = CompanyAPI;
    const [formData, setFormData] = useState({
        nit: "",
        name: "",
        address: "",
        phone: ""
    });

    /**
     * Handles the change event for form inputs.
     * @param e - The change event object.
     */
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Creates a new company.
     */
    const createCompany = async () => {
        try {
            const response = await companyAPi.createCompany(formData);
            if (response) {
                setFormData({
                    nit: "",
                    name: "",
                    address: "",
                    phone: ""
                })
                toast.showToast(labels.createCompanySuccess);
            }

        } catch (error) {
            toast.showToast(labels.errorToCreateCompany);
        }
    };

    const { nit, name, address, phone } = formData;

    return { handleChange, createCompany, nit, name, address, phone, labels, styles };
}