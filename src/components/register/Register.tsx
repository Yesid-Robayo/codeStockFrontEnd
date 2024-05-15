import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { RegisterLogic } from "./RegisterLogic";
/**
 * Renders the Register component.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onChangeLogin - The function to handle the login change event.
 * @returns {JSX.Element} The rendered Register component.
 */

export const Register = ({ onChangeLogin }: { onChangeLogin: () => void }) => {
    const { birthDate, createUser, firstName, labels, lastName, styles, handleChange, handleDateChange, handleGenderChange, email, gender, password, phoneNumber } = RegisterLogic({ onChangeLogin });
    return (
        <div className="flex justify-center mt-4 items-center h-full" style={{ minHeight: '60vh' }}>
            <div className="">
                <div className="border-2 border-zinc-800 p-5 rounded-3xl">
                    <div className="text-center font-normal mt-3 text-xl" style={{ fontFamily: styles.fonts.primary }}>
                        <h1>{labels.register}</h1>
                        <form onSubmit={(e) => { e.preventDefault(); createUser(); }} className="flex justify-center text-center flex-col mt-7">


                            <input type="text"
                                name="firstName"
                                value={firstName}
                                onChange={handleChange}
                                placeholder={labels.firstName}
                                autoComplete="given-name"
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"

                            />
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleChange}
                                placeholder={labels.lastName}
                                autoComplete="family-name"
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <DatePicker
                                selected={birthDate}
                                onChange={handleDateChange}
                                placeholderText={labels.birthDate}
                                className="w-full  border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <Select
                                backspaceRemovesValue={false}
                                options={[
                                    { value: 'male', label: labels.male },
                                    { value: 'female', label: labels.female }
                                ]}
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        borderBottom: '2px solid #6B7280',
                                        color: 'white',
                                        boxShadow: state.isFocused ? '0 0 0 1px #6B7280' : 'none',
                                        '&:hover': {
                                            borderColor: '#E5E7EB',
                                        },
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'white',
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        color: 'white',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#27272A',
                                        color: 'white',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isSelected ? '#6B7280' : '#27272A',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#6B7280',
                                        },
                                    }),
                                }}
                                value={{
                                    value: gender,
                                    label: gender ? (gender === 'male' ? labels.male : labels.female) : labels.gender,
                                }}
                                onChange={handleGenderChange}
                                placeholder={labels.gender}
                                className="w-full text-base text-center mt-5"
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                autoComplete="tel-national"
                                value={phoneNumber}
                                onChange={handleChange}
                                placeholder={labels.phoneNumber}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />
                            <input
                                type="text"
                                name="email"
                                value={email}
                                autoComplete="email"
                                onChange={handleChange}
                                placeholder={labels.email}
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />

                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder={labels.password}
                                autoComplete="current-password"
                                className="w-full border-b-2 text-base text-center border-zinc-800 bg-transparent text-white outline-none focus:border-zinc-500 mt-5"
                            />

                            <button type="submit" className="w-full bg-zinc-600 rounded-xl text-base text-white py-2 px-4 focus:outline-none hover:bg-zinc-700 mt-5">{labels.register}</button>
                        </form>
                        <button onClick={() => onChangeLogin()} className="text-sm mb-2 mt-6 font-light text-gray-300 mx-auto flex text-center">{labels.access}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
