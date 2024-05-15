import { routesUtil } from "../utils/routes.util";
import { createCompanyDTO, responseCompanyDTO } from "../utils/utilsDTOS";

/**
 * Represents the CompanyAPI object.
 */
export const CompanyAPI = {

    /**
     * The base URL for the company API.
     */
    baseURL: `${routesUtil.baseUrl}${routesUtil.companyRoute.main}`,

    /**
     * Creates a new company.
     * @param company - The company data.
     * @returns A promise that resolves to the created company.
     * @throws An error if the request fails.
     */
    async createCompany(company: createCompanyDTO) {

        const response = await fetch(`${this.baseURL}${routesUtil.companyRoute.children.createCompany}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCompany: 0,
                nit: company.nit,
                name: company.name,
                address: company.address,
                phone: company.phone
            })
        });

        if (response.ok) {
            const result = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },

    /**
     * Retrieves a list of companies.
     * @returns A promise that resolves to an array of companies or a number representing the status code if the request fails.
     */
    async getCompanies(): Promise<responseCompanyDTO[] | number> {
        const response = await fetch(`${this.baseURL}${routesUtil.companyRoute.children.getCompanies}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result: responseCompanyDTO[] = await response.json();
            return await result;
        } else {
            return (response.status);
        }
    },

    /**
     * Deletes a company.
     * @param idCompany - The ID of the company to delete.
     * @returns A promise that resolves to the deleted company or the status text if the request fails.
     */
    async deleteCompany(idCompany: number) {

        const response = await fetch(`${this.baseURL}${routesUtil.companyRoute.children.deleteCompany}${idCompany}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            return await result;
        } else {
            return (response.statusText);
        }
    },

    /**
     * Retrieves a company by ID.
     * @param idCompany - The ID of the company to retrieve.
     * @returns A promise that resolves to the retrieved company or the status code if the request fails.
     */
    async getCompany(idCompany: number) {
        const response = await fetch(`${this.baseURL}${routesUtil.companyRoute.children.getCompany}${idCompany}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result: responseCompanyDTO = await response.json();
            return await result;
        } else {
            return (response.status);
        }
    },

    /**
     * Updates a company.
     * @param company - The updated company data.
     * @returns A promise that resolves to the updated company.
     * @throws An error if the request fails.
     */
    async updateCompany(company: responseCompanyDTO) {

        const response = await fetch(`${this.baseURL}${routesUtil.companyRoute.children.updateCompany}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCompany: company.idCompany,
                nit: company.nit,
                name: company.name,
                address: company.address,
                phone: company.phone
            })
        });

        if (response.ok) {
            const result = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    }

}