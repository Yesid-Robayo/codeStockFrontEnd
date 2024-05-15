import { useEffect, useState } from "react";
import { useLabels, useToast } from "../../hooks/contextHooks";
import { CategoriesAPI } from "../../services/CategoriesAPI";
import { ProductsAPI } from "../../services/ProductsAPI";
import { categoriesResponseDTO, productResponseDTO } from "../../utils/utilsDTOS";

/**
 * Represents the logic for editing a product.
 * @param product - The product to be edited.
 * @param action - The action to be performed after editing the product.
 * @returns An object containing the edited product, expanded product, selected categories, categories, and various event handlers.
 */
export const EditProductLogic = ({ product, action }: { product: productResponseDTO, action: () => void }) => {
    const labels = useLabels();
    const categoriesAPI = CategoriesAPI;
    const productsAPI = ProductsAPI;
    const [editedProduct, setEditedProduct] = useState<productResponseDTO>({
        idProduct: product.idProduct,
        code: product.code,
        name: product.name,
        characteristics: product.characteristics,
        prices: product.prices,
        categories: product.categories,
        idCompany: product.idCompany,
    });
    const [expandedProduct, setExpandedProduct] = useState<productResponseDTO | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<categoriesResponseDTO[]>([]);
    const [categories, setCategories] = useState<categoriesResponseDTO[]>([]);
    const toast = useToast();

    /**
     * Loads the categories and sets the selected categories.
     */
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await categoriesAPI.getCategories();
                setCategories(response);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };
        setSelectedCategories(product.categories);
        loadCategories();
    }, []);

    /**
     * Toggles the expanded state of the product.
     */
    const toggleExpandProduct = () => {
        setExpandedProduct(product === expandedProduct ? null : product);
        setEditedProduct({
            idProduct: product.idProduct,
            code: product.code,
            name: product.name,
            characteristics: product.characteristics,
            prices: product.prices,
            categories: product.categories,
            idCompany: product.idCompany,
        });
    };

    /**
     * Handles the editing of the product.
     */
    const handleEditProduct = () => {
        if (editedProduct) {
            productsAPI
                .updateProduct({
                    idProduct: editedProduct.idProduct,
                    code: editedProduct.code,
                    name: editedProduct.name,
                    characteristics: editedProduct.characteristics,
                    prices: editedProduct.prices,
                    categories: selectedCategories,
                    idCompany: editedProduct.idCompany,
                })
                .then((response: any) => {
                    action();
                    setExpandedProduct(null);
                    toast.showToast(labels.updateProductSuccess);
                })
                .catch((error: any) => {
                    toast.showToast(labels.errorToUpdateProduct);
                });
        }
    };

    /**
     * Handles the deletion of the product.
     * @param product - The product to be deleted.
     */
    const handleDeleteProduct = (product: productResponseDTO) => {
        productsAPI
            .deleteProduct(product.idProduct)
            .then((response) => {
                if (response === 200) {
                    action();
                    toast.showToast(labels.deleteProductSuccess);
                }
            })
            .catch(() => {
                toast.showToast(labels.errorToDeleteProduct);
            });
    };

    /**
     * Handles the input change event.
     * @param e - The event object.
     * @param field - The field to be updated.
     */
    const handleInputChange = (
        e: any,
        field: keyof typeof editedProduct | number
    ) => {
        if (editedProduct !== undefined) {
            if (typeof field === 'number') {
                const fieldToUpdate = field;
                if (editedProduct.prices !== undefined) {
                    const newPrices = editedProduct.prices.map((price) => {
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

                    setEditedProduct({
                        ...editedProduct,
                        prices: newPrices,
                    });
                }
            } else {
                setEditedProduct({
                    ...editedProduct,
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

    return {
        editedProduct,
        expandedProduct,
        selectedCategories,
        categories,
        handleEditProduct,
        handleDeleteProduct,
        handleInputChange,
        handleSelectCategories,
        toggleExpandProduct,
        labels,
    }
}