import React, { useEffect, useState } from "react";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { categoriesResponseDTO, createCompanyDTO, productResponseDTO, responseCompanyDTO } from "../../utils/utilsDTOS";
import { CompanyAPI } from "../../services/CompanyAPI";
import { useParams } from "react-router-dom";
import { ProductsAPI } from "../../services/ProductsAPI";
import { CategoriesAPI } from "../../services/CategoriesAPI";

export const CompanyPage = () => {
    const labels = useLabels();
    const { id } = useParams();

    const styles = useStyles();
    const [products, setProducts] = useState<productResponseDTO[]>([]);
    const [expandedProduct, setExpandedProduct] = useState<productResponseDTO | null>(null);
    const [editedProduct, setEditedProduct] = useState<productResponseDTO | null>(null);
    const [newProduct, setNewProduct] = useState<productResponseDTO>({
        id: 0,
        code: "",
        name: "",
        characteristics: "",
        idCompany: parseInt(id || ""),
        prices: [
            { idCurrency: 1, price: 1, idProduct: 0 },
            { idCurrency: 2, price: 1, idProduct: 0 },
            { idCurrency: 3, price: 1, idProduct: 0 },
            { idCurrency: 4, price: 1, idProduct: 0 },
        ],
        categories: [],

    });
    const [editCompany, setEditCompany] = useState<boolean>(false);
    const companyAPI = CompanyAPI;
    const productsAPI = ProductsAPI;
    const categoriesAPI = CategoriesAPI;
    const [formCompany, setFormCompany] = useState<createCompanyDTO | null>(null)
    const [company, setCompany] = useState<responseCompanyDTO | null>(null);
    const [categories, setCategories] = useState<categoriesResponseDTO[]>([] as categoriesResponseDTO[]);

    const toast = useToast();
    const handleEditCompany = (company: responseCompanyDTO) => {
        setEditCompany(!editCompany);
    };
    const handleSaveCompany = () => {
        if (formCompany && id && formCompany.address !== "" && formCompany.name !== "" && formCompany.nit !== "" && formCompany.phone !== "") {
            companyAPI.updateCompany({
                idCompany: parseInt(id),
                nit: formCompany.nit,
                name: formCompany.name,
                address: formCompany.address,
                phone: formCompany.phone,
            }).then((response) => {
                setEditCompany(false);
                loadCompany();
                toast.showToast(labels.companyUpdateSuccess);
            }).catch((error) => {
                toast.showToast(labels.errorCompanyUpdate)
            });
        }
    }
    const loadCompany = () => {
        if (id) {
            companyAPI.getCompany(parseInt(id)).then((response) => {
                setCompany(response);
                setFormCompany({
                    nit: response.nit,
                    name: response.name,
                    address: response.address,
                    phone: response.phone,
                });
            }).catch((error) => {
                toast.showToast(labels.errorToGetCompanyOnly)
            });
        }
    }

    const loadCategories = () => {
        categoriesAPI.getCategories().then((response: categoriesResponseDTO[]) => {
            setCategories(response);
        }).catch((error) => {
            toast.showToast(labels.errorToGetProducts)
        });
    }
    const loadListProducts = () => {
        if (id) {
            productsAPI.getProductsByCompany(parseInt(id)).then((response) => {
                setProducts(response);
            }).catch((error) => {
                toast.showToast(labels.errorToGetProducts)
            });
        }
    }
    const [selectedCategories, setSelectedCategories] = useState<categoriesResponseDTO[]>([]);

    const handleSelectCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idCategory = parseInt(e.target.value);
        const selectName = e.target.options[e.target.selectedIndex].text;

        // Verificamos si la categoría seleccionada ya está en la lista
        const categoryIndex = selectedCategories.findIndex(category => category.idCategory === idCategory);

        if (categoryIndex !== -1) {
            // Si la categoría ya está presente, la eliminamos
            const updatedCategories = [...selectedCategories];
            updatedCategories.splice(categoryIndex, 1);
            setSelectedCategories(updatedCategories);
        } else {
            // Si la categoría no está presente, la agregamos
            setSelectedCategories([...selectedCategories, { idCategory, name: selectName }]);
        }
    };


    const { nit, name, address, phone } = formCompany || {};
    useEffect(() => {
        loadCompany();
        loadListProducts();
        loadCategories();
    }, []);
    const handleAddProduct = () => {


        setExpandedProduct({
            id: 0,
            code: "",
            name: "",
            characteristics: "",
            idCompany: parseInt(id || ""),
            prices: [],
            categories: [] as categoriesResponseDTO[], // Inicializamos categories como un array vacío
        });
    };

    const addProduct = () => {

        productsAPI.createProduct({
            id: 0,
            code: newProduct.code,
            name: newProduct.name,
            characteristics: newProduct.characteristics,
            idCompany: parseInt(id || ""),
            prices: newProduct.prices,
            categories: selectedCategories,
        }).then((response) => {
            loadListProducts();
            setExpandedProduct({
                id: 0,
                code: "",
                name: "",
                characteristics: "",
                idCompany: parseInt(id || ""),
                prices: [],
                categories: [] as categoriesResponseDTO[], // Inicializamos categories como un array vacío
            });
            setExpandedProduct(null);
            toast.showToast(labels.createProductSuccess);
        }).catch((error) => {
            toast.showToast(labels.errorToCreateProduct)
        })

    }

    const handleEditProduct = (product: productResponseDTO) => {
        setEditedProduct(product);
    };

    const handleDeleteProduct = (product: productResponseDTO) => {
        // Lógica para borrar el producto
        console.log(`Borrando producto: ${product.name}`);
    };

    const handleInputChange = (e: any, currency: any) => {
        const value = e.target.value;
        const currencyToUpdate = e.target.getAttribute('data-currency');
        if (!editedProduct) return;
        const newPrices = editedProduct.prices.map(price => {
            if (price.idCurrency === currencyToUpdate) {
                return { ...price, price: parseFloat(value) };
            }
            return price;
        });
        setEditedProduct({
            ...editedProduct,
            prices: newPrices,
        });
    };


    const handleInputChangeCompany = (e: React.ChangeEvent<HTMLInputElement>, field: keyof createCompanyDTO) => {
        if (formCompany) {
            setFormCompany({
                ...formCompany,
                [field]: e.target.value,
            });
        }
    }


    // Actualizar newProduct cuando cambian las categorías seleccionadas
    const handleInputChangeNewProduct = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof typeof newProduct | number
    ) => {
        if (newProduct !== undefined) {
            if (typeof field === 'number') {
                const fieldToUpdate = field;
                if (newProduct.prices !== undefined) {
                    const newPrices = newProduct.prices.map(price => {
                        if (price.idCurrency === fieldToUpdate) {
                            // Eliminar '0' a la derecha del número ingresado
                            const newValue = parseFloat(e.target.value);
                            const formattedValue = newValue.toString().endsWith('0') ? newValue.toFixed(0) : newValue;
                            return {
                                idCurrency: fieldToUpdate,
                                price: parseInt(formattedValue.toString()),
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
                // Manejo del caso cuando field es una clave válida de newProduct o newProduct.prices
                setNewProduct({
                    ...newProduct,
                    [field]: e.target.value,
                });
            }
        }
    };















    const toggleExpandProduct = (product: productResponseDTO) => {
        setExpandedProduct(product === expandedProduct ? null : product);
        setEditedProduct(null);
    };

    return (
        <div className="flex justify-center text-white  bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 items-center h-full" style={{ minHeight: '100vh', fontFamily: styles.fonts.text }}>
            <div className="sm:w-full md:w-2/3 lg:w-2/5 xl:w-2/6">
                <div className="border-2 border-zinc-800 p-5 rounded-3xl">
                    <div className="text-center font-light mt-3 text-xl" style={{ fontFamily: styles.fonts.primary }}>
                        <h1>{labels.companyInfo}</h1>
                        {!editCompany && company ? (
                            <div className="font-extralight">
                                <p>{labels.companyNIT}: </p>
                                <p>{company.nit}</p>
                                <p>{labels.companyName}: </p>
                                <p>{company.name}</p>
                                <p>{labels.companyAddress}: </p>
                                <p> {company.address}</p>
                                <p>{labels.companyPhone}:</p>
                                <p>{company.phone}</p>
                                <button
                                    onClick={() => handleEditCompany(company)}
                                    className="bg-zinc-600 text-white py-2 px-4 rounded mt-4 hover:bg-zinc-700"
                                >{labels.edit}
                                </button>
                            </div>
                        ) : (company &&
                            <>
                                <div className="mb-2">
                                    <label htmlFor="nit" className="font-normal">{labels.companyNIT}:</label>
                                    <input
                                        id="nit"
                                        type="text"
                                        name="nit"
                                        onChange={(e) => handleInputChangeCompany(e, "nit")}
                                        value={nit}
                                        defaultValue={company.nit}
                                        className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="name" className="font-semibold">{labels.companyName}:</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={(e) => handleInputChangeCompany(e, "name")}
                                        value={name}
                                        className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="address" className="font-semibold">{labels.companyAddress}:</label>
                                    <input
                                        id="address"
                                        type="text"
                                        onChange={(e) => handleInputChangeCompany(e, "address")}
                                        name="address"
                                        value={address}
                                        className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="phone" className="font-semibold">{labels.companyPhone}:</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        onChange={(e) => handleInputChangeCompany(e, "phone")}
                                        name="phone"
                                        value={phone}
                                        className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                    />
                                </div>
                                <button
                                    onClick={() => handleSaveCompany()}
                                    className="bg-zinc-600 text-white py-2 px-4 rounded mt-4 hover:bg-zinc-700"
                                >
                                    {labels.save}
                                </button>
                            </>
                        )}
                        <div className="flex justify-center items-center my-8"> <h2>{labels.products}</h2>
                            <div className="flex ">
                                <button
                                    onClick={handleAddProduct}
                                    className=" text-white px-4 ml-5 rounded mr-2 hover:bg-zinc-700"
                                >
                                    +
                                </button>
                            </div> </div>

                        <div className="grid grid-cols-1 gap-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-zinc-800 rounded-lg p-4 flex flex-col items-start"
                                >
                                    <div
                                        className="w-full flex items-center justify-between cursor-pointer"
                                        onClick={() => toggleExpandProduct(product)}
                                    >
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <span>{expandedProduct === product ? "-" : "+"}</span>
                                    </div>
                                    {expandedProduct === product && (
                                        <div className="mt-4 w-full">
                                            <div className="mb-2">
                                                <label htmlFor={`code-${product.id}`} className="font-semibold">
                                                    {labels.productCode}:
                                                </label>
                                                <input
                                                    id={`code-${product.id}`}
                                                    type="text"
                                                    value={editedProduct?.code || product.code}
                                                    onChange={(e) => handleInputChange(e, "code")}
                                                    className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor={`name-${product.id}`} className="font-semibold">
                                                    {labels.productName}:
                                                </label>
                                                <input
                                                    id={`name-${product.id}`}
                                                    type="text"
                                                    value={editedProduct?.name || product.name}
                                                    onChange={(e) => handleInputChange(e, "name")}
                                                    className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor={`characteristics-${product.id}`} className="font-semibold">
                                                    {labels.productCharacteristics}:
                                                </label>
                                                <input
                                                    id={`characteristics-${product.id}`}
                                                    type="text"
                                                    value={editedProduct?.characteristics || product.characteristics}
                                                    onChange={(e) => handleInputChange(e, "characteristics")}
                                                    className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor={`characteristics-${product.id}`} className="font-semibold">
                                                    {labels.productCharacteristics}:
                                                </label>
                                                <input
                                                    id={`characteristics-${product.id}`}
                                                    type="text"
                                                    value={editedProduct?.characteristics || product.characteristics}
                                                    onChange={(e) => handleInputChange(e, "characteristics")}
                                                    className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                />
                                            </div>
                                            {editedProduct?.prices && product.prices && (
                                                <>
                                                    <div className="mb-2">
                                                        <label htmlFor={`usd-price-${product.id}`} className="font-semibold">
                                                            {labels.productPriceUSD}:
                                                        </label>
                                                        <input
                                                            id={`usd-price-${product.id}`}
                                                            type="number"
                                                            value={editedProduct.prices.find(price => price.idCurrency === 1)?.price}
                                                            onChange={(e) => handleInputChange(e, 'USD')}
                                                            data-currency="USD"
                                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label htmlFor={`cop-price-${product.id}`} className="font-semibold">
                                                            {labels.productPriceCOP}:
                                                        </label>
                                                        <input
                                                            id={`cop-price-${product.id}`}
                                                            type="number"
                                                            value={editedProduct.prices.find(price => price.idCurrency === 2)?.price}
                                                            onChange={(e) => handleInputChange(e, 'COP')}
                                                            data-currency="COP"
                                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label htmlFor={`eur-price-${product.id}`} className="font-semibold">
                                                            {labels.productPriceEUR}:
                                                        </label>
                                                        <input
                                                            id={`eur-price-${product.id}`}
                                                            type="number"
                                                            value={editedProduct.prices.find(price => price.idCurrency === 3)?.price}
                                                            onChange={(e) => handleInputChange(e, 'EUR')}
                                                            data-currency="EUR"
                                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label htmlFor={`brl-price-${product.id}`} className="font-semibold">
                                                            {labels.productPriceBRL}:
                                                        </label>
                                                        <input
                                                            id={`brl-price-${product.id}`}
                                                            type="number"
                                                            value={editedProduct.prices.find(price => price.idCurrency === 4)?.price}
                                                            onChange={(e) => handleInputChange(e, 'BRL')}
                                                            data-currency="BRL"
                                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div className="flex justify-end mt-4">
                                                <button
                                                    onClick={() => handleEditProduct(product)}
                                                    className="bg-zinc-600 text-white py-2 px-4 rounded mr-2 hover:bg-zinc-700"
                                                >
                                                    {labels.edit}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product)}
                                                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                                                >
                                                    {labels.delete}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {expandedProduct && (
                                <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-start">
                                    <h3 className="text-lg font-semibold mb-4">{labels.addProduct}</h3>

                                    <div className="mb-2">
                                        <label htmlFor="new-code" className="font-semibold">
                                            {labels.productCode}:
                                        </label>
                                        <input
                                            id="new-code"
                                            type="text"
                                            value={newProduct.code}
                                            onChange={(e) => handleInputChangeNewProduct(e, "code")}
                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                        />

                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="new-name" className="font-semibold">
                                            {labels.productName}:
                                        </label>
                                        <input
                                            id="new-name"
                                            type="text"
                                            value={newProduct.name}
                                            onChange={(e) => handleInputChangeNewProduct(e, "name")}
                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="new-characteristics" className="font-semibold">
                                            {labels.productCharacteristics}:
                                        </label>
                                        <input
                                            id="new-characteristics"
                                            type="text"
                                            value={newProduct.characteristics}
                                            onChange={(e) => handleInputChangeNewProduct(e, "characteristics")}
                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="new-usd-price" className="font-semibold">
                                            {labels.productPriceUSD}:
                                        </label>
                                        <input
                                            id="new-usd-price"
                                            type="number"
                                            value={newProduct.prices && newProduct.prices[0] ? newProduct.prices[0].price : ''}
                                            onChange={(e) => handleInputChangeNewProduct(e, 1)}
                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="new-cop-price" className="font-semibold">
                                            {labels.productPriceCOP}:
                                        </label>
                                        <input
                                            id="new-cop-price"
                                            type="number"
                                            value={newProduct.prices && newProduct.prices[1] ? newProduct.prices[1].price : ''}
                                            onChange={(e) => handleInputChangeNewProduct(e, 2)}
                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="new-eur-price" className="font-semibold">
                                            {labels.productPriceEUR}:
                                        </label>
                                        <input
                                            id="new-eur-price"
                                            type="number"
                                            value={newProduct.prices && newProduct.prices[2] ? newProduct.prices[2].price : ''}
                                            onChange={(e) => handleInputChangeNewProduct(e, 3)}
                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="new-brl-price" className="font-semibold">
                                            {labels.productPriceBRL}:
                                        </label>
                                        <input
                                            id="new-brl"
                                            type="number"
                                            value={newProduct.prices && newProduct.prices[3] ? newProduct.prices[3].price : ''}
                                            onChange={(e) => handleInputChangeNewProduct(e, 4)}
                                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="font-semibold">
                                            {labels.productCategories}:
                                        </label>
                                        <select
                                            multiple
                                            value={selectedCategories.map((category) => category.idCategory.toString())}
                                            onChange={handleSelectCategories}
                                            className={`w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400`}
                                        >
                                            {categories.map((category) => (
                                                <option key={`${category.idCategory}-${category.name}`} value={category.idCategory.toString()}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>







                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={() => {
                                                addProduct()
                                            }}
                                            className="bg-zinc-600 text-white py-2 px-4 rounded mr-2 hover:bg-zinc-700"
                                        >
                                            {labels.add}
                                        </button>
                                        <button
                                            onClick={() => setExpandedProduct(null)}
                                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                                        >
                                            {labels.cancel}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {products.length === 0 && expandedProduct === null && (
                                <div className="text-center text-base text-gray-400">{labels.noProducts}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};