import { useNavigate } from "react-router-dom";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { ProductsAPI } from "../../services/ProductsAPI";
import { useEffect, useState } from "react";
import { productResponseDTO } from "../../utils/utilsDTOS";
import { useDispatch } from "react-redux";
import { orderReducer } from "../../redux/reducers/orderReducer";

/**
 * Represents the logic for the product page.
 * @returns An object containing various functions and state variables related to the product page.
 */
export const ProductPageLogic = () => {
    /**
     * Custom hook to fetch labels.
     */
    const labels = useLabels();

    /**
     * Custom hook to apply styles.
     */
    const styles = useStyles();

    /**
     * Instance of the ProductsAPI class.
     */
    const productsAPI = ProductsAPI;

    /**
     * Hook for navigation.
     */
    const navigate = useNavigate();

    /**
     * State variable for the search query.
     */
    const [searchQuery, setSearchQuery] = useState('');

    /**
     * State variable for the list of products.
     */
    const [products, setProducts] = useState<productResponseDTO[]>([]);

    /**
     * Redux dispatch function.
     */
    const dispatch = useDispatch();

    /**
     * Fetches all products from the API.
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
     * Filters products based on the search query.
     * @param product - The product to filter.
     * @returns True if the product's name contains the search query, false otherwise.
     */
    const filterProducts = (product: productResponseDTO) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    /**
     * Adds a product to the order.
     * @param product - The product to add to the order.
     */
    const addProductsToOrder = (product: productResponseDTO) => {
        dispatch(orderReducer.actions.addProductToOrder(product));
        navigate('/orders');
    }

    /**
     * Converts an ID currency to its corresponding currency code.
     * @param idCurrency - The ID of the currency.
     * @returns The currency code corresponding to the ID.
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
     * Event handler for search input change.
     * @param e - The change event.
     */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    /**
     * Fetches products when the component mounts.
     */
    useEffect(() => {
        fetchProducts();
    }, []);

    return { convertIdCurrency, handleSearchChange, labels, products, searchQuery, styles, addProductsToOrder, filterProducts };
}