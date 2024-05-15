import { useEffect, useState } from "react";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";
import { responseCompanyDTO } from "../../utils/utilsDTOS";
import { useNavigate } from "react-router-dom";

/**
 * Represents the logic for editing a company.
 * @returns An object containing the companies, handleEdit function, labels, and styles.
 */
export const EditCompanyLogic = () => {
    const labels = useLabels();
    const companyAPI = CompanyAPI;
    const styles = useStyles();
    const toast = useToast();
    const [companies, setCompanies] = useState<responseCompanyDTO[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Fetches the companies from the API and updates the state.
         */
        const fetchCompanies = async () => {
            try {
                const response = await companyAPI.getCompanies();
                if (typeof response === 'number') toast.showToast(labels.noCompanys);
                else if (typeof response === 'object') setCompanies(response);
            } catch (error) {
                toast.showToast(labels.errorToGetCompany);
            }
        };

        fetchCompanies();
    }, []);

    /**
     * Handles the edit action for a company.
     * @param company - The company to be edited.
     */
    const handleEdit = (company: responseCompanyDTO) => {
        navigate('/company/' + company.idCompany);
    };

    return { companies, handleEdit, labels, styles };
}