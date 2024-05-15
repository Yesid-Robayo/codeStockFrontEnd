import { useEffect, useState } from "react";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";
import { ProductsAPI } from "../../services/ProductsAPI";
import { productResponseDTO, responseCompanyDTO } from "../../utils/utilsDTOS";
import { useParams } from "react-router-dom";

/**
 * Represents the logic for the Company Page.
 * @returns An object containing company, products, loadCompany, loadListProducts, labels, styles, and id.
 */
export const CompanyPageLogic = () => {
    const labels = useLabels();
    const { id } = useParams();

    const styles = useStyles();
    const [products, setProducts] = useState<productResponseDTO[]>([]);
    const [company, setCompany] = useState<responseCompanyDTO | null>(null);

    const toast = useToast();
    const companyAPI = CompanyAPI;
    const productsAPI = ProductsAPI;

    /**
     * Loads the company data.
     */
    const loadCompany = () => {
        if (id) {
            companyAPI.getCompany(parseInt(id)).then((response) => {
                if (response === 404 && typeof response === 'number') {
                    toast.showToast(labels.noCompanys);
                } else if (typeof response === 'object') {
                    setCompany(response);
                    setCompany({
                        idCompany: response.idCompany,
                        nit: response.nit,
                        name: response.name,
                        address: response.address,
                        phone: response.phone,
                    });
                }
            }).catch((error) => {
                error === 404 ? toast.showToast(labels.noCompanys) :
                    toast.showToast(labels.errorToGetCompanyOnly);
            });
        }
    };

    /**
     * Loads the list of products for the company.
     */
    const loadListProducts = () => {
        setProducts([]);
        if (id) {
            productsAPI.getProductsByCompany(parseInt(id)).then((response) => {
                if (response === 404 && typeof response === 'number') {
                    toast.showToast(labels.noProducts);
                } else if (typeof response === 'object') {
                    setProducts(response);
                }
            }).catch((error) => {
                toast.showToast(labels.errorToGetProducts);
            });
        }
    };

    useEffect(() => {
        loadCompany();
        loadListProducts();
    }, []);

    return { company, products, loadCompany, loadListProducts, labels, styles, id };
}