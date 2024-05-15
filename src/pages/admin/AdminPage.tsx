
import { RegisterCompany } from "../../components/RegisterCompany/RegisterCompany";
import { EditCompany } from "../../components/editCompany/EditCompany";
import { DeleteCompany } from "../../components/deleteCompany/DeleteCompany";
import React from 'react';
import { AdminPageLogic } from "./AdminPageLogic";



/**
 * Renders the admin page component.
 * 
 * @returns The rendered admin page component.
 */
export const AdminPage = () => {
    const { labels, styles, option, onChange } = AdminPageLogic();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950" style={{ fontFamily: styles.fonts.text }}>
            <main className="flex-grow">
                <div className="container mx-auto py-12 px-4 pt-20 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <h2 className="text-2xl  mb-4" style={{ fontFamily: styles.fonts.primary }}>{labels.administration}</h2>
                        <div className="flex justify-center space-x-4">
                            <button onClick={() => onChange("add")} className="w-full bg-zinc-600 rounded-xl text-base text-white py-2 px-4 focus:outline-none hover:bg-zinc-700 mt-5">{labels.add}</button>
                            <button onClick={() => onChange("edit")} className="w-full bg-zinc-600 rounded-xl text-base text-white py-2 px-4 focus:outline-none hover:bg-zinc-700 mt-5">{labels.edit}</button>
                            <button onClick={() => onChange("delete")} className="w-full bg-zinc-600 rounded-xl text-base text-white py-2 px-4 focus:outline-none hover:bg-zinc-700 mt-5">{labels.delete}</button>
                        </div>
                    </div>
                    {option === 'add' && <RegisterCompany />}
                    {option === 'edit' && <EditCompany />}
                    {option === 'delete' && <DeleteCompany />}

                </div>
            </main>

        </div>
    );
};