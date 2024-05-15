import  { createContext } from 'react';
import { useStyles } from '../../hooks/contextHooks';
import React from 'react';

type ShowToastFunction = (message: string) => void;

export const ToastContext = createContext<{ showToast: ShowToastFunction }>({
    showToast: () => { }
});


/**
 * Renders a toast message component.
 * @param {string} message - The message to be displayed in the toast.
 * @returns {JSX.Element} The toast component.
 */
export const Toast = ({ message }: { message: string }): JSX.Element => {
    const styles = useStyles();

    return (
        <div className="fixed animate-enterFromLeft bottom-0 left-0 w-full p-4 flex justify-center">
            <div className="text-white px-4 py-2 rounded-full bg-zinc-700" style={{ fontFamily: styles.fonts.text }}>
                {message}
            </div>
        </div>
    );
};
