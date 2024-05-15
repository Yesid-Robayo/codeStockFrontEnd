import { useEffect, useState } from "react";
import { categoriesResponseDTO, productResponseDTO } from "../../utils/utilsDTOS";
import { CategoriesAPI } from "../../services/CategoriesAPI";
import { useLabels, useToast } from "../../hooks/contextHooks";
import { ProductsAPI } from "../../services/ProductsAPI";

/**
 * Represents the logic for adding a product.
 * @param idCompany - The ID of the company.
 * @param action - The action to be performed after adding the product.
 * @returns An object containing the state and functions related to adding a product.
 */
export const AddProductLogic = ({ idCompany, action }: { idCompany: number, action: () => void }) => {
    /**
     * Represents the state of the new product being added.
     */
    const [newProduct, setNewProduct] = useState<productResponseDTO>({
        idProduct: 0,
        code: '',
        name: '',
        characteristics: '',
        idCompany: 0,
        prices: [
            { idCurrency: 1, price: '1', idProduct: 0 },
            { idCurrency: 2, price: '1', idProduct: 0 },
            { idCurrency: 3, price: '1', idProduct: 0 },
            { idCurrency: 4, price: '1', idProduct: 0 },
        ],
        categories: [],
    });

    /**
     * Represents the API for retrieving categories.
     */
    const categoriesAPI = CategoriesAPI;

    /**
     * Represents the toast notification system.
     */
    const toast = useToast();

    /**
     * Represents the state of the expanded product.
     */
    const [expandedProduct, setExpandedProduct] = useState<productResponseDTO | null>(null);

    /**
     * Represents the selected categories for the product.
     */
    const [selectedCategories, setSelectedCategories] = useState<categoriesResponseDTO[]>([]);

    /**
     * Represents the available categories.
     */
    const [categories, setCategories] = useState<categoriesResponseDTO[]>([] as categoriesResponseDTO[]);

    /**
     * Represents the labels for the UI.
     */
    const labels = useLabels();

    /**
     * Represents the API for managing products.
     */
    const productsAPI = ProductsAPI;

    /**
     * Adds a new product.
     */
    const addProduct = () => {
        try {
            productsAPI.createProduct({
                code: newProduct.code,
                name: newProduct.name,
                characteristics: newProduct.characteristics,
                idCompany: idCompany,
                prices: newProduct.prices,
                categories: selectedCategories,
                idProduct: 0,
            }).then((response) => {
                toast.showToast(labels.createProductSuccess)
                setExpandedProduct(null)
                action()
            }).catch((error) => {
                toast.showToast(labels.errorToCreateProduct)
            });
        } catch (error) {
            toast.showToast(labels.errorToCreateProduct)
        }
    }

    /**
     * Handles the input change for the new product.
     * @param e - The event object.
     * @param field - The field to update in the new product.
     */
    const handleInputChangeNewProduct = (
        e: any,
        field: keyof typeof newProduct | number
    ) => {
        if (newProduct !== undefined) {
            if (typeof field === 'number') {
                const fieldToUpdate = field;
                if (newProduct.prices !== undefined) {
                    const newPrices = newProduct.prices.map((price) => {
                        if (price.idCurrency === fieldToUpdate) {
                            const newValue = parseFloat(e.target.value);
                            const formattedValue = newValue.toString().endsWith('0') ? newValue.toFixed(0) : newValue;
                            return {
                                idCurrency: fieldToUpdate,
                                price: (formattedValue.toString()),
                                idProduct: 0,
                            };
                        }
                        return price;
                    });

                    setNewProduct({
                        ...newProduct,
                        prices: newPrices,
                    });
                }
            } else {
                setNewProduct({
                    ...newProduct,
                    [field]: e.target.value,
                });
            }
        }
    };

    /**
     * Handles the selection of categories.
     * @param e - The event object.
     */
    const handleSelectCategories = (e: any) => {
        const idCategory = parseInt(e.target.value);
        const selectName = e.target.options[e.target.selectedIndex].text;

        const categoryIndex = selectedCategories.findIndex((category) => category.idCategory === idCategory);

        if (categoryIndex !== -1) {
            const updatedCategories = [...selectedCategories];
            updatedCategories.splice(categoryIndex, 1);
            setSelectedCategories(updatedCategories);
        } else {
            setSelectedCategories([...selectedCategories, { idCategory, name: selectName }]);
        }
    };

    /**
     * Handles the addition of a new product.
     */
    const handleAddProduct = () => {
        setExpandedProduct({
            idProduct: 0,
            code: '',
            name: '',
            characteristics: '',
            idCompany: 0,
            prices: [],
            categories: [] as categoriesResponseDTO[],
        });
    };

    /**
     * Loads the categories when the component mounts.
     */
    useEffect(() => {
        const loadCategories = () => {
            categoriesAPI.getCategories().then((response: categoriesResponseDTO[]) => {
                setCategories(response);
            }).catch((error) => {
                toast.showToast(labels.errorToGetProducts);
            });
        };

        loadCategories();
    }, []);

    return { newProduct, handleInputChangeNewProduct, handleSelectCategories, handleAddProduct, categories, selectedCategories, addProduct, expandedProduct, labels, setExpandedProduct };
}