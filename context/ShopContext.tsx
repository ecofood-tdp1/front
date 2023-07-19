import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from 'next/router';
import { Shop as ShopData } from "../model/Shop"; 

const defaultShop: ShopData = {
    _id: '',
    name: '',
    imageURL: '/defaultShopImage.png',
    type: "",
    pick_up_from: 0,
    pick_up_to: 0,
    description: "",
    phone: "",
    address: "",
    neighborhood: "",
    latitude: 0,
    longitude: 0
};

interface ShopDataContextType {
    shop: ShopData;
    setShop: (shop: ShopData) => void;
}

const ShopDataContextDefaultValues: ShopDataContextType = {
    shop: defaultShop,
    setShop: () => { },
};

export const ShopDataContext = createContext<ShopDataContextType>(ShopDataContextDefaultValues);

interface ContextProps {
    children: ReactNode;
}

export function ShopContext({ children }: ContextProps) {
    const router = useRouter();
    const { id } = router.query;
    const [currentShop, setCurrentShop] = useState<ShopData>(defaultShop);

    useEffect(() => {
        // Si la ruta es la de una tienda, obtén los datos de la tienda
        if (router.pathname.startsWith('/shops/') && id) {
            fetch(`/api/shops/${id}`)  // actualiza esta ruta a tu API de tiendas
                .then(response => response.json())
                .then(shopData => setCurrentShop(shopData));
        }
    }, [router.pathname, id]);

    const value = {
        shop: currentShop,
        setShop: setCurrentShop,
    };

    useEffect(() => {
        // Recupera los datos de la tienda de localStorage en la carga del componente
        const storedShopData = localStorage.getItem("ShopDataContext");
        if (storedShopData) {
            setCurrentShop(JSON.parse(storedShopData) as ShopData);
        }
    }, []);

    useEffect(() => {
        // Guarda los datos de la tienda en localStorage siempre que cambien
        localStorage.setItem("ShopDataContext", JSON.stringify(currentShop));
    }, [currentShop]);

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
}
