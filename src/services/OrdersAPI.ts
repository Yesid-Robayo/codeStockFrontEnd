import { routesUtil } from "../utils/routes.util";
import { orderRequestDTO } from "../utils/utilsDTOS";

/**
 * The OrdersAPI object provides methods for interacting with the orders API.
 */
export const OrdersAPI = {
    baseURL: `${routesUtil.baseUrl}${routesUtil.orderRoute.main}`,

    /**
     * Retrieves an order by its client ID.
     * @param idClient - The ID of the client.
     * @returns The order object if found, or the HTTP status code if not found.
     */
    async getOrderByIdClient(idClient: number) {

        const response = await fetch(`${this.baseURL}${routesUtil.orderRoute.children.getOrderByIdClient}${idClient}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            return response.status;
        }
    },

    /**
     * Deletes an order by its ID.
     * @param idOrder - The ID of the order to delete.
     * @throws An error if the deletion fails.
     */
    async deleteOrder(idOrder: number) {
        const response = await fetch(`${this.baseURL}${routesUtil.orderRoute.children.deleteOrder}${idOrder}`, {
            method: 'DELETE',
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

    /**
     * Creates a new order.
     * @param order - The order object to create.
     * @returns The HTTP status code of the created order.
     * @throws An error if the creation fails.
     */
    async createOrder(order: orderRequestDTO): Promise<number> {
        const response = await fetch(`${this.baseURL}${routesUtil.orderRoute.children.createOrder}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            const result = await response.status;
            return result;
        } else {
            throw new Error(response.statusText);
        }
    }
}