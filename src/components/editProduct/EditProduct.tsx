import React from 'react';
import { productResponseDTO } from '../../utils/utilsDTOS';
import { EditProductLogic } from './EditProductLogic';
/**
 * EditProduct component.
 * 
 * @param {Object} props - The component props.
 * @param {productResponseDTO} props.product - The product to be edited.
 * @param {Function} props.action - The action to be performed after editing the product.
 * @returns {JSX.Element} The EditProduct component.
 */
export const EditProduct = ({ product, action }: { product: productResponseDTO, action: () => void }) => {
    const { categories, editedProduct, expandedProduct, handleDeleteProduct, handleEditProduct, handleInputChange, handleSelectCategories, labels, selectedCategories, toggleExpandProduct } = EditProductLogic({ product, action });


    return (
        <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-start">
            <div className="w-full flex items-center justify-between cursor-pointer" onClick={toggleExpandProduct}>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span>{expandedProduct === product ? '-' : '+'}</span>
            </div>
            {expandedProduct === product && (
                <div className="mt-4 w-full">
                    <div className="mb-2">
                        <label className="font-semibold">{labels.productCode}:</label>
                        <input
                            type="text"
                            value={editedProduct?.code || product.code}
                            onChange={(e) => handleInputChange(e, 'code')}
                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">{labels.productName}:</label>
                        <input
                            type="text"
                            value={editedProduct?.name || product.name}
                            onChange={(e) => handleInputChange(e, 'name')}
                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">{labels.productCharacteristics}:</label>
                        <input
                            type="text"
                            value={editedProduct?.characteristics || product.characteristics}
                            onChange={(e) => handleInputChange(e, 'characteristics')}
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
                            value={editedProduct?.prices && editedProduct.prices[0] ? editedProduct.prices[0].price : ''}
                            onChange={(e) => handleInputChange(e, 1)}
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
                            value={editedProduct?.prices && editedProduct.prices[1] ? editedProduct.prices[1].price : ''}
                            onChange={(e) => handleInputChange(e, 2)}
                            className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="new-eur-price" className="font-semibold">
                            {labels.productPriceEUR}:
                        </label>
                        <input
                            id="new-eur-price"
                            type="number"
                            value={editedProduct?.prices && editedProduct.prices[2] ? editedProduct.prices[2].price : ''}
                            onChange={(e) => handleInputChange(e, 3)}
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
                            value={editedProduct?.prices && editedProduct.prices[3] ? editedProduct.prices[3].price : ''}
                            onChange={(e) => handleInputChange(e, 4)}
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
                    <div className="flex justify-between mt-4">
                        <button onClick={handleEditProduct} className="bg-zinc-600 text-white py-2 px-4 rounded mr-2 hover:bg-zinc-700">
                            {labels.edit}
                        </button>
                        <button onClick={() => handleDeleteProduct(product)} className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500">
                            {labels.delete}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
