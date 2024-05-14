import { CreateUserDTO, ResponseData } from "../utils/utilsDTOS";

export const UserAPI = {

    baseURL: 'http://localhost:8080/api/v1',

    async createUser(user: CreateUserDTO) {

        const response = await fetch(`${this.baseURL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok
        ) {
            let result: ResponseData = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    },


    async login(email: string, password: string) {
        const response = await fetch(`${this.baseURL}/user/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            let result = await response.json();
            return await result;
        } else {
            throw new Error(response.statusText);
        }
    }


}