import { useNavigate } from "react-router-dom";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";
import { useEffect, useState } from "react";
import { responseCompanyDTO } from "../../utils/utilsDTOS";

/**
 * Logic for the Company User Page.
 * @returns An object containing the necessary data and functions for the Company User Page.
 */
export const CompanyUserPageLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const companiesAPI = CompanyAPI;
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [companies, setCompanies] = useState<responseCompanyDTO[]>([]);

    /**
     * Fetches the list of companies from the API.
     */
    const fetchCompanies = async () => {
        try {
            companiesAPI.getCompanies().then((response) => {
                if (response === 404) {
                    console.error('Error fetching companies:', response);
                } else {
                    setCompanies(response as responseCompanyDTO[]);
                }
            }).catch((error) => { });
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    /**
     * Filters the list of companies based on the search query.
     * @param company - The company object to filter.
     * @returns True if the company name matches the search query, false otherwise.
     */
    const filterCompanies = (company: responseCompanyDTO) => {
        return company.name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    /**
     * Navigates to the company details page.
     * @param companyId - The ID of the company to navigate to.
     */
    const navigateToCompanyDetails = (companyId: number) => {
        navigate(`/companyProduct/${companyId}`); // Adjust the route according to your URL structure
    };

    /**
     * Handles the change event of the search input.
     * @param e - The change event object.
     */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return { companies, searchQuery, handleSearchChange, navigateToCompanyDetails, filterCompanies, labels, styles };
}