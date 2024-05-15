import { routesUtil } from "../utils/routes.util";
import { categoriesResponseDTO } from "../utils/utilsDTOS";

/**
 * CategoriesAPI is a service for retrieving categories from the server.
 */
export const CategoriesAPI = {
    baseUrl: `${routesUtil.baseUrl}${routesUtil.categoriesRoute.main}`,

    /**
     * Retrieves the categories from the server.
     * @returns A Promise that resolves to an array of categoriesResponseDTO.
     * @throws An Error if the server response is not successful.
     */
    async getCategories(): Promise<categoriesResponseDTO[]> {
        const response = await fetch(`${this.baseUrl}${routesUtil.categoriesRoute.children.getCategories}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error(response.statusText);
        }
    },
}