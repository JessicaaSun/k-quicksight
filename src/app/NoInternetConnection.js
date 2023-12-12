'use client'

import React, {useState, useEffect} from 'react';
import noConnection from '@assets/images/lost_onection.png'
import Image from "next/image";

const NoInternetConnection = (props) => {
    // state variable holds the state of the internet connection
    const [isOnline, setOnline] = useState(true);

    // On initization set the isOnline state.
    useEffect(()=>{
        setOnline(navigator.onLine)
    },[])

    if (typeof window !== 'undefined') {
        // event listeners to update the state
        window.addEventListener('online', () => {
            setOnline(true);
        });

        window.addEventListener('offline', () => {
            setOnline(false);
        });
    } else {
        console.warn('Window object is not defined. This code should run in a browser environment.');
    }

    // if user is online, return the child component else return a custom component
    if(isOnline){
        return(
            props.children
        )
    } else {
        return(
            <div className={'min-h-screen flex justify-center items-center'}>
                <div className="max-w-md p-8 rounded-xl text-center">
                    <Image src={noConnection} alt={'lost connection'} />
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">No Internet Connection</h1>
                    <p className="text-gray-600">Please check your network connection and try again later.</p>
                    <button onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Retry
                    </button>
                </div>
            </div>
        )
    }
}

export default NoInternetConnection;