import { useState } from "react";
import { useStyles } from "../../hooks/contextHooks";

/**
 * LoginPageLogic is a function that returns an object containing the styles, inRegister state, and onChangeLogin function.
 * @returns An object with the styles, inRegister state, and onChangeLogin function.
 */
export const LoginPageLogic = () => {
    const styles = useStyles();
    const [inRegister, setInRegister] = useState(false);

    /**
     * onChangeLogin is a function that toggles the value of inRegister state.
     */
    const onChangeLogin = () => {
        setInRegister(!inRegister);
    };

    return {
        styles,
        inRegister,
        onChangeLogin
    }
}