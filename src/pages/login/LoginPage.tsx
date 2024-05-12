import { useLabels, useStyles } from "../../hooks/contextHooks";

export const LoginPage = () => {
    const labels = useLabels();
    const styles = useStyles();
    return (
        <div className='bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 text-white' style={{ fontFamily: styles.fonts.text, height: '100vh' }}>
            <div
                id="home"
                className="flex justify-center items-center"
                style={{ height: 'calc(100vh - 5rem )' }}
            >
                <div className="h-1/2 w-2/3 border-2 border-zinc-800 p-5 rounded-3xl">
                    <div className="text-center font-normal text-xl  " style={{ fontFamily: styles.fonts.primary }}><h1>{labels.login}</h1>                    </div>


                </div>
            </div>
        </div>
    );
}