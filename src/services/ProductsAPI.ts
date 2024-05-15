import { routesUtil } from "../utils/routes.util";
import { productResponseDTO } from "../utils/utilsDTOS";

/**
 * Represents the ProductsAPI object.
 */
export const ProductsAPI = {
    baseURL: `${routesUtil.baseUrl}${routesUtil.productRoute.main}`,

    /**
     * Retrieves products by company ID.
     * @param idCompany - The ID of the company.
     * @returns A promise that resolves to an array of productResponseDTO or a number.
     */
    async getProductsByCompany(idCompany: number): Promise<productResponseDTO[] | number> {

        const response = await fetch(`${this.baseURL}${routesUtil.productRoute.children.getProductsByCompany}${idCompany}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result: productResponseDTO[] = await response.json();
            return await result;
        } else {
            return (response.status);
        }
    },

    /**
     * Creates a new product.
     * @param product - The product to create.
     * @returns A promise that resolves to the created productResponseDTO.
     * @throws An error if the request fails.
     */
    async createProduct(product: productResponseDTO): Promise<productResponseDTO> {
        const response = await fetch(`${this.baseURL}${routesUtil.productRoute.children.createProduct}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            const result: productResponseDTO = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }

    },

    /**
     * Deletes a product by ID.
     * @param idProduct - The ID of the product to delete.
     * @returns A promise that resolves to the status of the request or the status text.
     */
    async deleteProduct(idProduct: number) {
        const response = await fetch(`${this.baseURL}${routesUtil.productRoute.children.deleteProduct}${idProduct}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (response.ok) {
            const result = await response.status;
            return await result;
        } else {
            return (response.statusText);
        }
    },

    /**
     * Updates a product.
     * @param product - The product to update.
     * @returns A promise that resolves to the updated productResponseDTO.
     * @throws An error if the request fails.
     */
    async updateProduct(product: productResponseDTO): Promise<productResponseDTO> {
        const response = await fetch(`${this.baseURL}${routesUtil.productRoute.children.updateProduct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            const result: productResponseDTO = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },

    /**
     * Sends inventory for email by company ID.
     * @param idCompany - The ID of the company.
     * @returns A promise that resolves to the status of the request or the status text.
     */
    async sendInventoryForEmail(idCompany: number) {
        const response = await fetch(`${this.baseURL}${routesUtil.productRoute.children.sendInventoryForEmail}${idCompany}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.status;
            return await result;
        } else {
            return (response.statusText);
        }
    },

    /**
     * Sends inventory email with PDF for user order.
     * @param products - The products to include in the email.
     * @returns A promise that resolves to the status of the request or the status text.
     */
    async sendInventoryEmailPDFUserOrder(products: productResponseDTO[]) {
        const response = await fetch(`${this.baseURL}${routesUtil.productRoute.children.sendInventoryEmailPDFUserOrder}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });

        if (response.ok) {
            const result = await response.status;
            return await result;
        } else {
            return (response.statusText);
        }

    },

    /**
     * Retrieves all products.
     * @returns A promise that resolves to an array of productResponseDTO or a number.
     */
    async getAllProducts(): Promise<productResponseDTO[] | number> {

        const response = await fetch(`${this.baseURL}${routesUtil.productRoute.children.getAllProducts}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result: productResponseDTO[] = await response.json();
            return await result;
        } else {
            return (response.status);
        }
    }
}