import { useSelector } from "react-redux";
import { userData } from "../../utils/utilsDTOS";
import { RegisterCompany } from "../../components/RegisterCompany/RegisterCompany";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { useState } from "react";
import { typeOfOptionCreateCompany } from "../../utils/utilsTypes";
import { EditCompany } from "../../components/editCompany/EditCompany";
import { DeleteCompany } from "../../components/deleteCompany/DeleteCompany";
import { useNavigate } from "react-router-dom";



export const AdminPage = () => {
    const labels = useLabels();
    const styles = useStyles();
    const userData: userData = useSelector((state: any) => state.auth.user);
    const [option, setOption] = useState<typeOfOptionCreateCompany>('add');
    const onChange = (option: typeOfOptionCreateCompany) => {
        setOption(option);
    }
  
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
            {/* Footer */}
            <footer className="text-center text-white py-4">
                <p>Derechos reservados &copy; 2024 | Nombre de tu empresa</p>
            </footer>
        </div>
    );
};