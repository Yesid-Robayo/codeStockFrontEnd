import { useState } from "react";
import { Login } from "../../components/login/Login";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { Register } from "../../components/register/Register";

export const LoginPage = () => {
    const labels = useLabels();
    const styles = useStyles();
    const [inRegister, setInRegister] = useState(false);
    const onChangeLogin = () => {
        setInRegister(!inRegister);
    }
    return (
        <div className='bg-gradient-to-r pt-20 from-zinc-950 via-zinc-800 w-full to-zinc-950 text-white' style={{ fontFamily: styles.fonts.text, minHeight: '100vh' }}>
            <div className="flex justify-center items-center h-full" style={{ minHeight: '60vh' }}>
                {inRegister ? <Register onChangeLogin={onChangeLogin} /> : <Login onChangeLogin={onChangeLogin} />}
            </div>
        </div>
    );
}
