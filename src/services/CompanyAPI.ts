import { get } from "http";
import { createCompanyDTO, responseCompanyDTO } from "../utils/utilsDTOS";

export const CompanyAPI = {

    baseURL: 'http://localhost:8080/api/v1',

    async createCompany(company: createCompanyDTO) {

        const response = await fetch(`${this.baseURL}/company`, {
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

        if (response.ok
        ) {
            let result = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },


    async getCompanies(): Promise<responseCompanyDTO[]> {
        const response = await fetch(`${this.baseURL}/companies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let result: responseCompanyDTO[] = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },

    async deleteCompany(idCompany: number) {

        const response = await fetch(`${this.baseURL}/company/${idCompany}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let result = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },

    async getCompany(idCompany: number) {
        const response = await fetch(`${this.baseURL}/company/${idCompany}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let result: responseCompanyDTO = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },

    async updateCompany(company: responseCompanyDTO) {
            
            const response = await fetch(`${this.baseURL}/company`, {
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
                let result = await response.json();
                return await result;
            } else {
                throw new Error(response.statusText);
            }
    }

}