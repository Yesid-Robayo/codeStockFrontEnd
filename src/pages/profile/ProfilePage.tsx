import React from 'react';
import { ProfilePageLogic } from './ProfilePageLogic';


/**
 * Renders the profile page component.
 * @returns The profile page component.
 */
export const ProfilePage = () => {
    const { labels, styles, userAPI, userData, dateConverter } = ProfilePageLogic();
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r text-white from-zinc-950 via-zinc-800 to-zinc-950" style={{ fontFamily: styles.fonts.text }}>
            <main className="flex-grow">
                <div className="container mx-auto py-12 px-4 pt-20 sm:px-6 lg:px-8">
                    <h1 className='text-3xl my-5 text-center' style={{ fontFamily: styles.fonts.primary }}>{labels.profile}</h1>


                    <div className="mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 mb-1">{labels.firstName}</label>
                                <span className="text-white">{userData.name}</span>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">{labels.lastName}</label>
                                <span className="text-white">{userData.lastName}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-gray-300 mb-1">{labels.email}</label>
                                <span className="text-white">{userData.email}</span>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">{labels.phoneNumber}</label>
                                <span className="text-white">{userData.phone}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-gray-300 mb-1">{labels.birthDate}</label>
                                <span className="text-white">{dateConverter(userData.dateOfBirth)}</span>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">{labels.gender}</label>
                                <span className="text-white">{userData.gender}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
