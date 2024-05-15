import { useEffect, useState } from 'react';
import { useLabels, useStyles, useToast } from '../../hooks/contextHooks';
import { productResponseDTO, responseCompanyDTO } from '../../utils/utilsDTOS';
import { CompanyAPI } from '../../services/CompanyAPI';
import { useParams } from 'react-router-dom';
import { ProductsAPI } from '../../services/ProductsAPI';
import { EditCompanyForProduct } from '../../components/editCompanyForProducts/EditCompanyForProducts';
import { AddProduct } from '../../components/addProduct/AddProduct';
import { EditProduct } from '../../components/editProduct/EditProduct';
import React from 'react';
import { CompanyPageLogic } from './CompanyPageLogic';

/**
 * Renders the CompanyPage component.
 * 
 * @returns The CompanyPage component.
 */

export const CompanyPage = () => {

    const { company, loadCompany, loadListProducts, products, labels, styles, id } = CompanyPageLogic();

    return (
        <div className="flex justify-center text-white bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 items-center h-full" style={{ minHeight: '100vh', fontFamily: styles.fonts.text }}>
            <div className="sm:w-full mt-20 md:w-2/3 lg:w-2/5 xl:w-2/6">
                <div className="border-2 border-zinc-800 p-5 rounded-3xl">
                    <EditCompanyForProduct
                        key={company?.idCompany || 0}
                        company={company}
                        loadCompany={loadCompany}
                    />
                    <div className="flex flex-col justify-center items-center my-8">
                        <h2>{labels.products}</h2>

                        <div className="flex">
                            <AddProduct
                                idCompany={parseInt(id || '0')}
                                action={loadListProducts}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((product) => (
                            <EditProduct
                                key={product.idProduct}
                                product={
                                    product
                                }
                                action={loadListProducts}
                            />
                        ))}
                        {products.length === 0 && (
                            <div className="text-center text-base text-gray-400">{labels.noProducts}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};