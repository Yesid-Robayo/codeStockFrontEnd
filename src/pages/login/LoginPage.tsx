import { Login } from "../../components/login/Login";
import { Register } from "../../components/register/Register";
import React from 'react';
import { LoginPageLogic } from "./LoginPageLogic";


/**
 * Renders the login page component.
 * @returns The login page component.
 */
export const LoginPage = () => {
    const { styles, inRegister, onChangeLogin } = LoginPageLogic();
    return (
        <div className='bg-gradient-to-r pt-20 from-zinc-950 via-zinc-800 w-full to-zinc-950 text-white' style={{ fontFamily: styles.fonts.text, minHeight: '100vh' }}>
            <div className="flex justify-center items-center h-full" style={{ minHeight: '60vh' }}>
                {inRegister ? <Register onChangeLogin={onChangeLogin} /> : <Login onChangeLogin={onChangeLogin} />}
            </div>
        </div>
    );
}
