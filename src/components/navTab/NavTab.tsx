import codeStock from '../../assets/codeStockIMG.png';
import IonIcon from '@reacticons/ionicons';
import React from 'react';
import { NavTabLogic } from './NavTabLogic';

/**
 * Renders the navigation tab component.
 * @returns The JSX element representing the navigation tab.
 */

export const NavTab = () => {

    const { labels, styles, isAutenticaded, userData, navigateToPath, toggleMenu, closeSesion, isOpen } = NavTabLogic();
    return (
        <div className="fixed w-full bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 text-white h-20">
            <div className="flex justify-between items-center w-full h-full px-5">
                <div className="flex items-center">
                    <button onClick={() => navigateToPath('/')}> <img src={codeStock} alt="codeStock" className="mr-4 h-10" /></button>
                    <button onClick={() => navigateToPath('/')}>
                        <h1 className='text-xl' style={{ fontFamily: styles.fonts.primary }}>{labels.titlePage}</h1>
                    </button>
                </div>
                <div className='lg:hidden'>
                    <button onClick={() => isAutenticaded ? navigateToPath('/orders') : navigateToPath('/login')}>
                        <IonIcon className='mr-4' name='cart' size='large' />
                    </button>
                    <button onClick={toggleMenu} className={`text-3xl `}>
                        <IonIcon name={isOpen ? 'close' : 'menu'} className={`${isOpen ? 'animate-spinFromRight' : 'animate-spinFromLeft'}`} />
                    </button>
                </div>
                <div className={`hidden  lg:flex justify-center items-center gap-10`}>
                    <ul className="flex   justify-center text-center space-x-16">

                        <li className="flex-grow">
                            <button onClick={() => navigateToPath('/')} className="hover:underline">{labels.home}</button>
                        </li>
                        <li className={`${userData ? userData.idRole === 1 ? 'flex' : 'hidden' : 'hidden'} flex-grow mb-3`}>
                            <button onClick={() => navigateToPath('/admin')} className="hover:underline">{labels.admin}</button>
                        </li>
                        <li className="flex-grow">
                            <button onClick={() => navigateToPath('/products')} className="hover:underline">{labels.products}</button>
                        </li>
                        <li className="flex-grow">
                            <button onClick={() => navigateToPath('/companys')} className="hover:underline">{labels.companys}</button>
                        </li>
                        <li className="flex-grow">
                            <button onClick={() => isAutenticaded ? navigateToPath('/profile') : navigateToPath('/login')} className="hover:underline">{isAutenticaded ? labels.profile : labels.access}</button>
                        </li>
                        <li className={`${isAutenticaded ? 'flex' : 'hidden'} mb-3 flex-grow`}>
                            <button onClick={() => isAutenticaded ? closeSesion() : ''} className="hover:underline">
                                {labels.logOut}
                            </button>
                        </li>
                        <button onClick={() => isAutenticaded ? navigateToPath('/orders') : navigateToPath('/login')}>
                            <IonIcon className='mr-4' name='cart' size='large' />
                        </button>
                    </ul>
                </div>
                <div className={`absolute w-full lg:hidden bg-gradient-to-r from-zinc-950 h-full via-zinc-800 to-zinc-950 z-50 justify-center items-start pt-6 top-0 mt-20 left-0 ${isOpen ? 'flex ' : 'hidden'}`} style={{ height: 'calc(100vh - 5rem)' }}>
                    <ul className="flex flex-col text-center animate-enterFromRight gap-10">
                        <li>
                            <button onClick={() => navigateToPath('/')}>{labels.home}</button>
                        </li>
                        <li className={`${userData ? userData.idRole === 1 ? 'flex' : 'hidden' : 'hidden'}`}>
                            <button onClick={() => navigateToPath('/admin')}>{labels.admin}</button>
                        </li>
                        <li>
                            <button onClick={() => navigateToPath('/products')}>{labels.products}</button>
                        </li>
                        <li>
                            <button onClick={() => navigateToPath('/companys')}>{labels.companys}</button>
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
            </div>
        </div>
    );
}
