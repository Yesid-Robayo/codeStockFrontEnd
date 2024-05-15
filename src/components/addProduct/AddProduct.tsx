import React from 'react';
import { AddProductLogic } from './AddProductLogic';

/**
 * Renders the AddProduct component.
 *
 * @param idCompany - The ID of the company.
 * @param action - The action to be performed.
 * @returns The rendered AddProduct component.
 */

export const AddProduct = ({ idCompany, action }: { idCompany: number, action: () => void }) => {

    const { addProduct, categories, handleAddProduct, handleInputChangeNewProduct, handleSelectCategories, newProduct, selectedCategories, labels, expandedProduct, setExpandedProduct } = AddProductLogic({ idCompany, action });

    return (
        <div>
            <div className='flex justify-center my-5'>
                <button onClick={handleAddProduct} className=" text-white px-4 ml-5 rounded mr-2 hover:bg-zinc-700">
                    +
                </button>
            </div>

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
                            onChange={(e) => handleInputChangeNewProduct(e, 'code')}
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
                            onChange={(e) => handleInputChangeNewProduct(e, 'name')}
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
                            onChange={(e) => handleInputChangeNewProduct(e, 'characteristics')}
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
                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400" />
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
                            id="new-brl-price"
                            type="number"
                            value={newProduct.prices && newProduct.prices[3] ? newProduct.prices[3].price : ''}
                            onChange={(e) => handleInputChangeNewProduct(e, 4)}
                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">{labels.productCategories}:</label>
                        <select
                            multiple
                            value={selectedCategories.map((category) => category.idCategory.toString())}
                            onChange={handleSelectCategories}
                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                        >
                            {categories.map((category) => (
                                <option key={`${category.idCategory}-${category.name}`} value={category.idCategory.toString()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex  w-full justify-between mt-4">
                        <button
                            onClick={() => addProduct()}
                            className="bg-zinc-600 text-white py-2 px-4 rounded mr-2 hover:bg-zinc-700"
                        >
                            {labels.add}
                        </button>
                        <button
                            onClick={() => setExpandedProduct(null)}
                            className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-700"
                        >
                            {labels.cancel}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

