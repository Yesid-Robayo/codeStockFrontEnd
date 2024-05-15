import { useNavigate, useParams } from "react-router-dom";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";
import { ProductsAPI } from "../../services/ProductsAPI";
import { useEffect, useState } from "react";
import { productResponseDTO, responseCompanyDTO } from "../../utils/utilsDTOS";

/**
 * Logic for the CompanyForProducts page.
 * @returns An object containing the company, products, searchQuery, handleSearchChange, labels, styles, fetchProducts, convertIdCurrency, and filterProducts functions.
 */
export const CompanyForProductsLogic = () => {
    const { id } = useParams();

    const labels = useLabels();
    const styles = useStyles();
    const productsAPI = ProductsAPI;
    const companiesAPI = CompanyAPI;
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<productResponseDTO[]>([]);
    const [company, setCompany] = useState<responseCompanyDTO | null>(null);

    /**
     * Fetches all products from the API and updates the products state.
     */
    const fetchProducts = async () => {
        try {
            productsAPI.getAllProducts().then((response) => {
                if (response === 404) {
                    console.error('Error fetching products:', response);
                } else {
                    setProducts(response as productResponseDTO[]);
                }
            }).catch((error) => { });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    /**
     * Fetches the company with the provided ID from the API and updates the company state.
     */
    const fetchCompany = async () => {
        try {
            if (!id) {
                console.error('No company ID provided');
                return;
            } else {
                companiesAPI.getCompany(parseInt(id)).then((response) => {
                    if (response === 404) {
                        console.error('Error fetching company:', response);
                    } else {
                        setCompany(response as responseCompanyDTO);
                    }
                }).catch((error) => { });
            }
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    };

    /**
     * Filters products based on the search query.
     * @param product - The product to filter.
     * @returns True if the product's name includes the search query, false otherwise.
     */
    const filterProducts = (product: productResponseDTO) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    /**
     * Converts the ID of a currency to its corresponding symbol.
     * @param idCurrency - The ID of the currency.
     * @returns The symbol of the currency.
     */
    const convertIdCurrency = (idCurrency: number) => {
        switch (idCurrency) {
            case 1:
                return 'USD';
            case 2:
                return 'COP';
            case 3:
                return 'EUR';
            case 4:
                return 'BRL';
            default:
                return 'USD';
        }
    }

    /**
     * Handles changes in the search field.
     * @param e - The event object.
     */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Load products and company data when the component mounts
    useEffect(() => {
        fetchProducts();
        fetchCompany();
    }, []);

    return { company, products, searchQuery, handleSearchChange, labels, styles, fetchProducts, convertIdCurrency, filterProducts };
}