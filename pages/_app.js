import NavBar from "../components/navbar/navbar";
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css';
import Context from "../context/Context";
import Head from 'next/head'


export default function MyApp({ Component, pageProps }) {
    return (
        <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover" />
            </Head>
            <ChakraProvider>
                <Context>
                    <NavBar />
                    <Component {...pageProps} />
                </Context>
            </ChakraProvider>
        </div>
    )
}