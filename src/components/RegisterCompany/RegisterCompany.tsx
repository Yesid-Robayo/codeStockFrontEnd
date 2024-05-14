import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLabels, useStyles, useToast } from "../../hooks/contextHooks";
import { CompanyAPI } from "../../services/CompanyAPI";

export const RegisterCompany = () => {
    const labels = useLabels();
    const styles = useStyles();
    const toast = useToast();
    const companyAPi = CompanyAPI;
    const [formData, setFormData] = useState({
        nit: "",
        name: "",
        address: "",
        phone: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const createCompany = async () => {
        try {
            const response = await companyAPi.createCompany(formData);
            if (response) {
                setFormData({
                    nit: "",
                    name: "",
                    address: "",
                    phone: ""
                })
                toast.showToast(labels.createCompanySuccess);
            }

        } catch (error) {
        }
    };

    const { nit, name, address, phone } = formData;

    return (<div className="flex justify-center mt-4 items-center text-white h-full" style={{ minHeight: '60vh' }}>
        <div className="sm:w-2/4 md:w-2/3 lg:w-2/5 xl:w-2/6">
            <div className="border-2 border-zinc-800 p-5 rounded-3xl">
                <div className="text-center font-normal mt-3 text-xl" style={{ fontFamily: styles.fonts.primary }}>
                    <h1>{labels.registerCompany}</h1>
                    <form onSubmit={(e) => { e.preventDefault(); createCompany(); }} className="flex justify-center text-center flex-col mt-7">
                        <input
                            type="text"
                            name="nit"
                            value={nit}
                            onChange={handleChange}
                            placeholder="NIT"
                            className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                        />
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                        />
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                        />

                        <button type="submit" className="w-full bg-zinc-600 rounded-xl text-base text-white py-2 px-4 focus:outline-none hover:bg-zinc-700 mt-5">{labels.registerCompany}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>)
};