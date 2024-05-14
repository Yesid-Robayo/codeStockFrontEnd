import { categoriesResponseDTO } from "../utils/utilsDTOS";

export const CategoriesAPI = {
    baseUrl: 'http://localhost:8080/api/v1',

    async getCategories(): Promise<categoriesResponseDTO[]> {
        const response = await fetch(`${this.baseUrl}/category`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let result = await response.json();
            return result;
        } else {
            throw new Error(response.statusText);
        }
    },
}