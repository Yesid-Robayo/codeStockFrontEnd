import { useState } from 'react';
import codeStock from '../../assets/codeStockIMG.png';
import { useLabels, useStyles, useToast } from '../../hooks/contextHooks';
import IonIcon from '@reacticons/ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authReducer } from '../../redux/reducers/authReducer';
import { userData } from '../../utils/utilsDTOS';

export const NavTab = () => {
    const labels = useLabels();
    const styles = useStyles();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();
    const isAutenticaded = useSelector((state: any) => state.auth.isAuthenticated);
    const userData: userData = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();
    const closeSesion = () => {
        navigate('/home');
        dispatch(authReducer.actions.logOut());
        setIsOpen(false);
        toast.showToast(labels.logOutSuccess);
    }
    const navigateToPath = (path: string) => {
        navigate(path);
        setIsOpen(false);
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div className="fixed w-full bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 text-white h-20" >
            <div className="flex justify-between items-center w-full h-full px-5">

                <div className="text-2xl max-h-10 max-w-10 font-bold">
                    <button onClick={() => navigateToPath('/')}> <img src={codeStock} alt="codeStock" /></button>
                </div>

                <button onClick={() => navigateToPath('/')}>
                    <h1 className='text-xl' style={{ fontFamily: styles.fonts.primary }}>{labels.titlePage}</h1>

                </button>


                <button onClick={toggleMenu} className={`text-3xl  `}>
                    <IonIcon name={isOpen ? 'close' : 'menu'} className={`${isOpen ? 'animate-spinFromRight' : 'animate-spinFromLeft'}`} />
                </button>


                <div className={`absolute w-full bg-gradient-to-r from-zinc-950 h-full via-zinc-800 to-zinc-950 z-50 justify-center items-start pt-6 top-0 mt-20 left-0 ${isOpen ? 'flex ' : 'hidden'}`} style={{ height: 'calc(100vh - 5rem)' }}>
                    <ul className="flex flex-col text-center animate-enterFromRight gap-10">
                        <li className={`${userData ? userData.idRole === 1 ? 'flex' : 'hidden' : 'hidden'}`}>
                            <button onClick={() => navigateToPath('/admin')}>{labels.admin}</button>
                        </li>
                        <li>
                            <button onClick={() => navigateToPath('/allProducts')}>{labels.products}</button>
                        </li>
                        <li>
                            <button onClick={() => navigateToPath('/categorys')}>{labels.categorys}</button>
                        </li>
                        <li>
                            <button onClick={() => navigateToPath('/companys')}>{labels.companys}</button>
                        </li>
                        <li>
                            <button onClick={() => navigateToPath('/aboutUS')}>{labels.us}</button>
                        </li>
                        <li>
                            <button onClick={() => isAutenticaded ? navigateToPath('/profile') : navigateToPath('/login')}>{isAutenticaded ? labels.profile : labels.access}</button>
                        </li>
                        <li className={`${isAutenticaded ? 'flex' : 'hidden'}`}>
                            <button onClick={() => isAutenticaded ? closeSesion() : ''}>
                                {labels.logOut}
                            </button>
                        </li>
                    </ul>
                </div>


            </div >
        </div >
    );

}


