import { useState } from "react";
import { ProductsAPI } from "../../services/ProductsAPI";
import { createCompanyDTO, responseCompanyDTO } from "../../utils/utilsDTOS";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";

/**
 * Represents the logic for editing a company for a product.
 * @param company - The company to be edited.
 * @param loadCompany - A function to load the company.
 * @returns An object containing the state and functions related to editing the company.
 */
export const EditCompanyForProductLogic = ({ company, loadCompany }: { company: responseCompanyDTO | null, loadCompany: () => void }) => {
    /**
     * Represents whether the company is being edited or not.
     */
    const [editCompany, setEditCompany] = useState<boolean>(false);

    /**
     * Represents the form data for the company.
     */
    const [formCompany, setFormCompany] = useState<createCompanyDTO>(
        {
            nit: company?.nit || '',
            name: company?.name || '',
            address: company?.address || '',
            phone: company?.phone || '',
        }
    );

    /**
     * Represents the styles for the component.
     */
    const styles = useStyles();

    /**
     * Represents the labels for the component.
     */
    const labels = useLabels();

    /**
     * Represents the API for managing companies.
     */
    const companyAPI = CompanyAPI;

    /**
     * Represents the toast notification utility.
     */
    const toast = useToast();

    /**
     * Handles the edit company action.
     * @param company - The company to be edited.
     */
    const handleEditCompany = (company: responseCompanyDTO) => {
        setEditCompany(!editCompany);
    };

    /**
     * Handles the save company action.
     */
    const handleSaveCompany = () => {
        if (formCompany && company && formCompany.address !== '' && formCompany.name !== '' && formCompany.nit !== '' && formCompany.phone !== '') {
            companyAPI
                .updateCompany({
                    idCompany: company.idCompany,
                    nit: formCompany.nit,
                    name: formCompany.name,
                    address: formCompany.address,
                    phone: formCompany.phone,
                })
                .then((response: any) => {
                    setEditCompany(false);
                    loadCompany();
                    toast.showToast(labels.companyUpdateSuccess);
                })
                .catch((error: any) => {
                    toast.showToast(labels.errorCompanyUpdate);
                });
        }
    };

    /**
     * Handles the input change for the company form.
     * @param e - The change event.
     * @param field - The field to be updated.
     */
    const handleInputChangeCompany = (e: React.ChangeEvent<HTMLInputElement>, field: keyof createCompanyDTO) => {
        if (formCompany) {
            setFormCompany({
                ...formCompany,
                [field]: e.target.value,
            });
        }
    };

    /**
     * Sends the inventory for the company via email.
     */
    const sendInventoryForEmail = () => {
        toast.showToast(labels.sendInventoryInProcess);
        if (company) {
            ProductsAPI.sendInventoryForEmail(company.idCompany).then((response) => {
                if (response === 200) {
                    toast.showToast(labels.sendInventoryForEmailSuccess);
                }
            }).catch((error) => {
                toast.showToast(labels.errorToSendInventory);
            });
        } else {
            toast.showToast(labels.errorToSendInventory);
        }
    }

    return {
        editCompany,
        formCompany,
        handleEditCompany,
        handleInputChangeCompany,
        handleSaveCompany,
        sendInventoryForEmail,
        labels,
        styles,
        setEditCompany
    }
}