import React, { useEffect, useState } from "react";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import {  createCompanyDTO, responseCompanyDTO } from "../../utils/utilsDTOS";
import { CompanyAPI } from "../../services/CompanyAPI";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../context/toastContext/toastContext";



export const EditCompany = () => {
    const labels = useLabels();
    const companyAPI = CompanyAPI;
    const styles = useStyles();
    const toast = useToast();
    const [companies, setCompanies] = useState<responseCompanyDTO[]>([

    ]);
    const navigate = useNavigate();
    const navigateToPath = (path: string) => {
        navigate(path);
    }
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await companyAPI.getCompanies();
                setCompanies(response);
            } catch (error) {
                toast.showToast(labels.errorToGetCompany);
            }
        };

        fetchCompanies();



    }, []);
    const handleEdit = (company: responseCompanyDTO) => {
        navigate('/company/' + company.idCompany);
    };

    return (
        <div className="flex justify-center mt-4 text-white items-center h-full" style={{ minHeight: '60vh' }}>
            <div className="sm:w-2/4 md:w-2/3 lg:w-2/5 xl:w-2/6">
                <div className="border-2 border-zinc-800 p-5 rounded-3xl">
                    <div className="text-center font-normal mt-3 text-xl" style={{ fontFamily: styles.fonts.primary }}>
                        <h1>{labels.allCompanys}</h1>
                        <div className="grid grid-cols-1 gap-4 mt-7">
                            {companies.map((company, index) => (
                                <div
                                    key={index}
                                    className="bg-zinc-800 rounded-lg p-4 flex items-center justify-between"
                                >
                                    <div>
                                        <h2 className="text-base font-semibold">{company.name}</h2>
                                        <p className="text-gray-400">{company.nit}</p>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(company)}
                                        className="bg-zinc-600 ml-5 text-white py-2 px-4 text-sm rounded hover:bg-zinc-700"
                                    >
                                        {labels.edit}
                                    </button>
                                </div>
                            ))}

                            {companies.length === 0 && <div className="text-center text-base text-gray-400">{labels.noCompanys}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};