import React from 'react';
import { CompanyUserPageLogic } from './CompanyUserPageLogic';


/**
 * Renders the Company User Page component.
 * This component displays a list of companies and allows the user to search for specific companies.
 */
export const CompanyUserPage = () => {

    const { companies, filterCompanies, handleSearchChange, labels, navigateToCompanyDetails, searchQuery, styles } = CompanyUserPageLogic();
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r text-white from-zinc-950 via-zinc-800 to-zinc-950" style={{ fontFamily: styles.fonts.text }}>
            <main className="flex-grow">
                <div className="container mx-auto py-12 px-4 pt-20 sm:px-6 lg:px-8">
                    <h1 className='text-3xl mt-5 text-center' style={{ fontFamily: styles.fonts.primary }}>{labels.allCompanys}</h1>
                    <div className="flex justify-center mt-8">
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full max-w-md px-4 py-2 rounded border text-white bg-zinc-600 border-gray-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                        {companies.filter(filterCompanies).map(company => (
                            <div key={company.idCompany} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <div className="p-4">
                                    <h2 className="text-xl mb-2">{company.name}</h2>
                                    <p className="text-gray-300 mb-2">{labels.companyNIT}: {company.nit}</p>
                                    <p className="text-gray-300 mb-2">{labels.companyAddress}: {company.address}</p>
                                    <p className="text-gray-300 mb-2">{labels.companyPhone}: {company.phone}</p>
                                    <div className="flex justify-center mt-8">
                                        <button onClick={() => navigateToCompanyDetails(company.idCompany)} className="bg-zinc-600 py-2 px-4 rounded hover:bg-gray-300">{labels.showMore}</button>
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
