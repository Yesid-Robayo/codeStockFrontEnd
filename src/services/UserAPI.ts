import { routesUtil } from "../utils/routes.util";
import { CreateUserDTO, ResponseData } from "../utils/utilsDTOS";

/**
 * UserAPI object that contains methods for creating a user and logging in.
 */
export const UserAPI = {

    /**
     * Base URL for the user API.
     */
    baseURL: `${routesUtil.baseUrl}${routesUtil.userRoute.main}`,

    /**
     * Creates a new user.
     * @param user - The user data to be created.
     * @returns A promise that resolves to the created user data.
     * @throws An error if the request fails.
     */
    async createUser(user: CreateUserDTO) {

        const response = await fetch(`${this.baseURL}${routesUtil.userRoute.children.createUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const result: ResponseData = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },

    /**
     * Logs in a user.
     * @param email - The user's email.
     * @param password - The user's password.
     * @returns A promise that resolves to the logged in user data.
     * @throws An error if the request fails.
     */
    async login(email: string, password: string) {
        const response = await fetch(`${this.baseURL}${routesUtil.userRoute.children.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    }
}