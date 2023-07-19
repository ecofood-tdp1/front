import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css';
import Context from "../context/Context";
import Head from 'next/head'
import BottomNavBar from "../components/BottomNavBar";


export default function MyApp({ Component, pageProps }) {
    return (
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover" />
            </Head>
            <ChakraProvider >
                <Context>
                    <Component {...pageProps} />
                    <BottomNavBar/>
                </Context>
            </ChakraProvider>
        </div>
    )
}