import React from "react";
import { responseCompanyDTO } from "../../utils/utilsDTOS";
import { EditCompanyForProductLogic } from "./EditCompanyForProductLogic";

/**
 * Renders a component for editing company information for products.
 * @param company - The company object to edit.
 * @param loadCompany - A function to load the company information.
 * @returns The JSX element representing the EditCompanyForProduct component.
 */

export const EditCompanyForProduct = ({ company, loadCompany }: { company: responseCompanyDTO | null, loadCompany: () => void }) => {

    const { editCompany, formCompany, handleEditCompany, handleInputChangeCompany, handleSaveCompany, sendInventoryForEmail, labels, styles, setEditCompany } = EditCompanyForProductLogic({ company, loadCompany });
    return (
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
                    <div className="flex flex-col justify-center items-center mt-4">
                        <button
                            onClick={() => sendInventoryForEmail()}
                            className="bg-zinc-600 text-white  py-2 px-4 text-sm rounded hover:bg-zinc-700"
                        >
                            {labels.sendInventoryForEmail}
                        </button>
                        <button onClick={() => handleEditCompany(company)} className="bg-zinc-600 text-base text-white py-2 px-4 rounded mt-4 hover:bg-zinc-700">
                            {labels.edit}
                        </button>
                    </div>

                </div>
            ) : (
                company && (
                    <>
                        <div className="mb-2">
                            <label htmlFor="nit" className="font-normal">
                                {labels.companyNIT}:
                            </label>
                            <input
                                id="nit"
                                type="text"
                                name="nit"
                                onChange={(e) => handleInputChangeCompany(e, 'nit')}
                                value={formCompany.nit}
                                className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="font-semibold">
                                {labels.companyName}:
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={(e) => handleInputChangeCompany(e, 'name')}
                                value={formCompany.name}
                                className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="address" className="font-semibold">
                                {labels.companyAddress}:
                            </label>
                            <input
                                id="address"
                                type="text"
                                onChange={(e) => handleInputChangeCompany(e, 'address')}
                                name="address"
                                value={formCompany.address}
                                className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone" className="font-semibold">
                                {labels.companyPhone}:
                            </label>
                            <input
                                id="phone"
                                type="text"
                                onChange={(e) => handleInputChangeCompany(e, 'phone')}
                                name="phone"
                                value={formCompany.phone}
                                className="w-full border-b border-zinc-600 bg-transparent text-white outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <button onClick={() => handleSaveCompany()} className="bg-zinc-600 text-white py-2 px-4 rounded mt-4 hover:bg-zinc-700">
                                {labels.save}
                            </button>
                            <button onClick={() => {
                                setEditCompany(false);
                            }} className="bg-red-400 text-white py-2 px-4 rounded mt-4 hover:bg-zinc-700">
                                {labels.cancel}
                            </button>
                        </div>

                    </>
                )
            )}
        </div>
    );
};
