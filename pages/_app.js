import NavBar from "../components/navbar/navbar";
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css';
import Context from "../context/Context";

export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Context>
                <NavBar />
                <Component {...pageProps} />
            </Context>
        </ChakraProvider>
    )
}