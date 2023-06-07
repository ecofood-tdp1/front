import { useEffect, useRef, useState } from 'react'
import Header from './Header'
import { ShopCard } from './ShopCard'
import React from 'react'
import { GetShops } from '../../repository/ShopRepository';
import { Flex, Select, Text, Textarea } from '@chakra-ui/react';
// import img from '../../public/food2.jpg'
import img from '../../public/bolsa.jpg'

const BuyerHome = () => {
    let shopsRef = useRef<HTMLParagraphElement | null>(null);
    const [shops, setShops] = useState<Shop[]>([])
    const [filteredShops, setFilteredShops] = useState<Shop[]>([])
    let [value, setValue] = React.useState('')

    const defaultShopData = {
        "name": "",
        "type": "",
        "pick_up_from": {},
        "pick_up_to": {},
        "description": "",
        "phone": "",
        "address": ""
    }

    const [searchData, setSearchData] = useState(defaultShopData);

    const scrollHandler = async () => {
        // @ts-ignore
        shopsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
        });

        const shopResults = await GetShops()
        setShops(shopResults)
    }

    const handleSearch = (event) => {
        const { name, value } = event.target
        setSearchData(prev => ({ ...prev, [name]: value }))
        let result = shops

        console.log(value)

        if (name === "address") { // se acaba de actualizar este filtro -> usar filtro nuevo
            result = result.filter(s => s.address.toLowerCase().includes(value.toLowerCase()))
        }

        if (name === "type" && value !== "Any") {
            result = result.filter(p => p.type.toLowerCase().includes(value.toLowerCase()))
        } else if (searchData.type && searchData.type !== "Any" && value !== "Any") {
            result = result.filter(p => p.type.toLowerCase().includes(searchData.type.toLowerCase()))
        }


        setFilteredShops(result);
    }

    const refreshShops = async () => {
        let allNewShop = await GetShops();
        setShops(allNewShop)
        setFilteredShops(allNewShop);
        setSearchData(defaultShopData);
    }

    useEffect(() => {
        refreshShops();
    }, []);

    useEffect(() => {
    }, [filteredShops, setFilteredShops]);

    return (
        <>
            <Header image={img} description={"Comé rico y económico"} description2={"salvando el planeta"} buttonTitle={"Comprá"} scrollHandler={scrollHandler} />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-32">
                <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div
                            className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl"
                            ref={shopsRef}
                        >
                            Elegí un negocio
                        </div>
                    </div>
                </div>
                <Flex mb="32px">
                    <Flex direction="column" mr="16px">
                        <Text mb="10px">Barrio:</Text>
                        <Textarea
                            value={searchData.address}
                            name="address"
                            onChange={handleSearch}
                            placeholder="Ingresa un barrio"
                            size="sm"
                            resize="none"
                        />
                    </Flex>
                    <Flex direction="column" ml="32px"> {/* Added ml (margin-left) */}
                        <Text mb="8px">Elegir por categoria:</Text>
                        <Select mb="8px" placeholder="Elegir una opción" name="type" onChange={handleSearch} >
                            <option value="restaurant" onChange={handleSearch}>🍴 Restaurantes</option>
                            <option value="supermarket" onChange={handleSearch}>🛒 Supermercados</option>
                            <option value="coffee" onChange={handleSearch}>☕ Cafés</option>
                            <option value="grocery" onChange={handleSearch}>🥫 Verdulerías</option>
                            <option value="delicatessen" onChange={handleSearch}>🍲 Delicatessen</option>
                            <option value="bakery" onChange={handleSearch}>🥐 Panaderías</option>
                            <option value="others" onChange={handleSearch}>Otros</option>
                        </Select>
                    </Flex>
                </Flex>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {
                        filteredShops.map(shop =>
                            <ShopCard key={shop._id}
                                shop={shop}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default BuyerHome;