import { useLabels, useStyles } from "../../hooks/contextHooks";

export const Register = ({ onChangeLogin }: { onChangeLogin: () => void }) => {
    const labels = useLabels();
    const styles = useStyles();
    return (
        <div className="flex justify-center mt-4 items-center h-full" style={{ minHeight: '60vh' }}>
            <div className="sm:w-2/4 md:w-2/3 lg:w-2/5 xl:w-2/6">
                <div className="border-2 border-zinc-800 p-5 rounded-3xl">
                    <div className="text-center font-normal mt-3 text-xl" style={{ fontFamily: styles.fonts.primary }}>
                        <h1>{labels.register}</h1>
                        <div className="flex justify-center text-center flex-col mt-7">
                            <input
                                type="text"
                                placeholder={labels.firstName}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500"
                            />
                            <input
                                type="text"
                                placeholder={labels.lastName}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <input
                                type="text"
                                placeholder={labels.birthDate}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <select
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            >
                                <option value="">{labels.gender}</option>
                                <option value="male">{labels.male}</option>
                                <option value="female">{labels.female}</option>
                            </select>
                            <input
                                type="text"
                                placeholder={labels.phoneNumber}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <input
                                type="text"
                                placeholder={labels.email}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <input
                                type="password"
                                placeholder={labels.password}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <button className="w-full bg-zinc-600 rounded-xl text-base text-white py-2 px-4 focus:outline-none hover:bg-zinc-700 mt-5">{labels.register}</button>
                            <button onClick={() => onChangeLogin()} className="text-sm mb-2  mt-6 font-light text-gray-300 mx-auto flex text-center">{labels.access}</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}