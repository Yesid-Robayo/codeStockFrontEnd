import React from 'react';
import servicesIMG from '../../assets/homeIMG.png';
import { HomePageLogic } from './HomePageLogic';
/**
 * Renders the home page component.
 * @returns The rendered home page component.
 */

export const HomePage = () => {
  const { styles, labels, navigateToPath} = HomePageLogic();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r text-white from-zinc-950 via-zinc-800 to-zinc-950" style={{ fontFamily: styles.fonts.text }}>
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4 pr-5 pt-20 sm:px-6 ">
          <h1 className='text-3xl mt-5 text-center lg:hidden' style={{ fontFamily: styles.fonts.primary }}>{labels.ourServices}</h1>
          <img src={servicesIMG} alt="Servicios" className="w-full lg:hidden mx-auto mb-4" />

          <div className="text-center lg:flex lg:justify-center lg:items-center text-white mb-8">
            <div className='flex flex-col lg:mr-6'>
              <div className="container mx-auto pb-4 px-4 sm:px-6 text-center hidden lg:flex justify-center ">
                <h1 className='text-3xl text-center' style={{ fontFamily: styles.fonts.primary }}>{labels.ourServices}</h1>
              </div>
              <p className="text-lg text-justify mb-4">{labels.discoverServicesText}</p>
            </div>
            <img src={servicesIMG} alt="Servicios" className="w-full hidden lg:flex mx-auto mb-4" />

          </div>
          <div className='flex flex-col lg:flex-row lg:space-x-28 lg:mb-10'>
            <div className="text-center text-white lg:mr-4 mb-8">
              <h2 className='text-xl mb-5 ' style={{ fontFamily: styles.fonts.primary }}>{labels.products}</h2>
              <p className="text-lg mb-4 text-justify">{labels.discoverProductsText}</p>
              <button onClick={() => navigateToPath('/products')} className="bg-zinc-600   py-2 px-4 rounded hover:bg-gray-300">{labels.showMore}</button>
            </div>
            <div className="text-center text-white mb-8">
              <h2 className='text-xl mb-5 ' style={{ fontFamily: styles.fonts.primary }}>{labels.companys}</h2>
              <p className="text-lg mb-4 text-justify">{labels.discoverCompanyText}</p>
              <button onClick={() => navigateToPath('/companys')} className="bg-zinc-600 py-2 px-4 rounded hover:bg-gray-300">{labels.showMore}</button>
            </div>
          </div>

          <div className="text-center text-white mb-8">
            <h2 className='text-xl mb-5 ' style={{ fontFamily: styles.fonts.primary }}>{labels.aboutUs}</h2>
            <p className="text-lg mb-4 text-justify">{labels.aboutUsText}</p>
          </div>
        </div>
      </main>

    </div>
  );
};