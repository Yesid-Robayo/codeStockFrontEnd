import { create } from "domain";
import { productResponseDTO } from "../utils/utilsDTOS";

export const ProductsAPI = {
    baseURL: 'http://localhost:8080/api/v1',

    async getProductsByCompany(idCompany: number): Promise<productResponseDTO[]> {

        const response = await fetch(`${this.baseURL}/productsCompany/${idCompany}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let result: productResponseDTO[] = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },

    async createProduct(product: productResponseDTO): Promise<productResponseDTO> {
        const response = await fetch(`${this.baseURL}/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            let result: productResponseDTO = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }

    }



}