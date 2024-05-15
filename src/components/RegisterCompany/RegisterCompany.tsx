import React from "react";
import { RegisterCompanyLogic } from "./RegisterCompanyLogic";

/**
 * Component for registering a company.
 * @returns JSX.Element
 */
export const RegisterCompany = () => {

    const { handleChange, createCompany, nit, name, address, phone, labels, styles } = RegisterCompanyLogic();

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