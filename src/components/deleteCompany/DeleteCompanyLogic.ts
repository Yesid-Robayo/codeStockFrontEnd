import { useEffect, useState } from "react";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";
import { responseCompanyDTO } from "../../utils/utilsDTOS";

/**
 * Logic for deleting a company.
 * @returns An object containing the companies, deleteCompany function, styles, and labels.
 */
export const DeleteCompanyLogic = () => {
    const labels = useLabels();
    const companyAPI = CompanyAPI;
    const toast = useToast();
    const styles = useStyles();
    const [companies, setCompanies] = useState<responseCompanyDTO[]>([]);

    useEffect(() => {
        /**
         * Fetches the list of companies.
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
     * Deletes a company.
     * @param company - The company to be deleted.
     */
    const deleteCompany = (company: responseCompanyDTO) => {
        try {
            companyAPI.deleteCompany(company.idCompany).then((response: any) => {
                if (response.statusCode === 200) {
                    setCompanies(companies.filter((item: any) => item.idCompany !== company.idCompany));
                    toast.showToast(labels.deleteCompanyToName + company.name);
                }
            });
        } catch (error) {
            toast.showToast(labels.errorToDeleteCompany);
        }
    };

    return { companies, deleteCompany, styles, labels };
}