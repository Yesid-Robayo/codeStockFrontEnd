


export interface MessageProps {
    question: string;
    onAccept: () => void;
    onCancel: () => void;
}
export interface productResponseDTO {
    id: number;
    code: string;
    name: string;
    characteristics: string;
    idCompany: number; 
    prices: {
        idCurrency: number,
        price: number,
        idProduct: number
    }[];
    categories:categoriesResponseDTO[];
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

