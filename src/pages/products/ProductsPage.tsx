import React from 'react';
import { ProductPageLogic } from './ProductPageLogic';



/**
 * Renders the ProductsPage component.
 * This component displays a list of products and allows the user to search for specific products.
 */
export const ProductPage = () => {

    /**
     * Destructures the values returned from the ProductPageLogic hook.
     */
    const {
        searchQuery,
        handleSearchChange,
        labels,
        styles,
        products,
        filterProducts,
        addProductsToOrder,
        convertIdCurrency
    } = ProductPageLogic();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r text-white from-zinc-950 via-zinc-800 to-zinc-950" style={{ fontFamily: styles.fonts.text }}>
            <main className="flex-grow">
                <div className="container mx-auto py-12 px-4 pt-20 sm:px-6 lg:px-8">
                    <h1 className='text-3xl mt-5 text-center' style={{ fontFamily: styles.fonts.primary }}>{labels.allProducts}</h1>
                    <div className="flex justify-center mt-8">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full max-w-md px-4 py-2 rounded border text-white bg-zinc-600 border-gray-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                        {products.filter(filterProducts).map(product => (
                            <div key={product.idProduct} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <div className="p-4">
                                    <h2 className="text-xl mb-2">{product.name}</h2>
                                    <p className="text-gray-300 mb-2">{labels.productCode}: {product.code}</p>

                                    <p className="text-gray-300 mb-2">{product.characteristics}</p>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            {product.prices.map((price: any) => (
                                                <p key={price.idCurrency} className="text-gray-300">
                                                    {price.price} {convertIdCurrency(price.idCurrency)}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="flex justify-center mt-8">
                                            <button onClick={() => addProductsToOrder(product)} className="bg-zinc-600 py-2 px-4 rounded hover:bg-gray-300">{labels.obtain}</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </main>
        </div>
    );
};
