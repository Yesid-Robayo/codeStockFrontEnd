


export interface MessageProps {
    question: string;
    onAccept: () => void;
    onCancel: () => void;
}
/**
 * Represents a product response data transfer object (DTO).
 */
export interface productResponseDTO {
    /**
     * The ID of the product.
     */
    idProduct: number;
    
    /**
     * The code of the product.
     */
    code: string;
    
    /**
     * The name of the product.
     */
    name: string;
    
    /**
     * The characteristics of the product.
     */
    characteristics: string;
    
    /**
     * The ID of the company associated with the product.
     */
    idCompany: number;
    
    /**
     * The prices of the product in different currencies.
     */
    prices: {
        /**
         * The ID of the currency.
         */
        idCurrency: number,
        
        /**
         * The price of the product in the currency.
         */
        price: string,
        
        /**
         * The ID of the product.
         */
        idProduct: number
    }[];
    
    /**
     * The categories associated with the product.
     */
    categories: categoriesResponseDTO[];
}

export interface categoriesResponseDTO {
    idCategory: number;
    name: string;
}
export interface ResponseData {
    statusCode: number;
    message: string;
}
export interface CreateUserDTO {
    name: string;
    phone: string;
    lastName: string;
    gender: string;
    email: string;
    dateOfBirth: Date;
    username: string;
    password: string
}



export interface createCompanyDTO {
    nit: string;
    name: string;
    address: string;
    phone: string;

}

export interface responseCompanyDTO {
    idCompany: number;
    nit: string;
    name: string;
    address: string;
    phone: string;

}

export interface userData {
    name: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    idPerson: string;
    gender: string;
    idRole: number;
    phone: string;

}


export interface orderRequestDTO {
    idPerson: number
    products: {
        idProduct: number,
        quantity: number
    }[]
    date: Date,

}



