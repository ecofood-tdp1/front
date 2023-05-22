import NavBar from "../components/navbar/navbar";
import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    const [userMode, setUserMode] = useState('Owner');

    const handleModeChange = (mode) => {
        setUserMode(mode);
        if (typeof window !== 'undefined') {
            console.log(`Changing to ${mode} mode`)
            localStorage.setItem('userMode', mode);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedMode = localStorage.getItem('userMode');
            setUserMode(storedMode ? storedMode : 'Owner');
        }
    }, []);

    return (
        <ChakraProvider>
            <NavBar userMode={userMode} onModeChange={handleModeChange} />
            <Component {...pageProps} userMode={userMode} />
        </ChakraProvider>
    )
}