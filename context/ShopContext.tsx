import { createContext, useState, useEffect, ReactNode } from "react";
import { Shop as ShopData } from "../model/Shop"; // actualiza esta ruta para tu modelo de tienda


// Asegúrate de reemplazar esto con un valor predeterminado más apropiado
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
    const [currentShop, setCurrentShop] = useState<ShopData>(defaultShop);

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
