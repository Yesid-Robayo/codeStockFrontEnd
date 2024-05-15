import React from 'react';
import { OrdersPageLogic } from './OrdersPageLogic';

/**
 * Renders the OrdersPage component.
 * This component displays a list of orders and provides functionality to delete individual orders or all orders.
 */
export const OrdersPage = () => {

    const { convertIdCurrency, deleteAllOrders, deleteOrder, labels, orders, sendEmailForOrder, styles } = OrdersPageLogic();
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r text-white from-zinc-950 via-zinc-800 to-zinc-950" style={{ fontFamily: styles.fonts.text }}>
            <main className="flex-grow">
                <div className="container mx-auto py-12 px-4 pt-20 sm:px-6 lg:px-8">
                    {orders.length === 0 ? (
                        <h1 className="text-xl mt-5 text-center">{labels.noHaveProducts}</h1>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                                {orders.map(order => (
                                    <div key={order.idProduct} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                        <div className="p-4">
                                            <h2 className="text-xl mb-2">{order.name}</h2>
                                            <p className="text-gray-300 mb-2">{labels.productCode}: {order.code}</p>

                                            <p className="text-gray-300 mb-2">{order.characteristics}</p>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    {order.prices.map((price: any) => (
                                                        <p key={price.idCurrency} className="text-gray-300">
                                                            {price.price} {convertIdCurrency(price.idCurrency)}
                                                        </p>
                                                    ))}
                                                </div>
                                                <div className="flex justify-center mt-8">
                                                    <button onClick={() => deleteOrder(order.idProduct)} className="bg-zinc-600 py-2 px-4 rounded hover:bg-zinc-500">{labels.delete}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-8">
                                <button onClick={deleteAllOrders} className="bg-zinc-600 py-2 px-4 rounded hover:bg-zinc-500">{labels.deleteAllProducts}</button>
                                <button onClick={() => sendEmailForOrder()} className="bg-zinc-600 py-2 px-4 rounded hover:bg-gray-300 ml-4">{labels.sendPDFOrderGmail}</button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};
