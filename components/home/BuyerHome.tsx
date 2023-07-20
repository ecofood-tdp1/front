import { useEffect, useRef, useState } from 'react'
import Header from './Header'
import { ShopCard } from './ShopCard'
import React from 'react'
import { GetShops } from '../../repository/ShopRepository';
import { Flex, Grid, Input, Select, Text, Textarea } from '@chakra-ui/react';
import img from '../../public/bolsa.jpg'
import { Shop } from '../../model/Shop';
import { CategoryCard } from './CategoryCard';
import ShopCardSkeleton from './ShopCardSkeleton';

const defaultShopData = {
    "name": "",
    "type": "",
    "pick_up_from": {},
    "pick_up_to": {},
    "description": "",
    "phone": "",
    "neighborhood": ""
}

const types = ["restaurant", "bakery", "coffee", "supermarket",
    "grocery", "delicatessen", "others"]


const BuyerHome = () => {
    let shopsRef = useRef<HTMLParagraphElement | null>(null);
    const [shops, setShops] = useState<Shop[]>([])
    const [filteredShops, setFilteredShops] = useState<Shop[]>([])
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null)
    const [searchData, setSearchData] = useState(defaultShopData);
    const [loaded, setLoaded] = useState(false)

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

        if (name === "neighborhood") {
            setSelectedCategoryFilter(null)
            result = result.filter(s => s.neighborhood.toLowerCase().includes(value.toLowerCase()))
        }

        if (name === "type" && value !== "Any") {
            result = result.filter(p => p.type.toLowerCase().includes(value.toLowerCase()))
        } else if (searchData.type && searchData.type !== "Any" && value !== "Any") {
            result = result.filter(p => p.type.toLowerCase().includes(searchData.type.toLowerCase()))
        }


        setFilteredShops(result);
    }

    const handleCategoryFilter = (category) => {
        let result = shops

        if (category === selectedCategoryFilter) {
            setSelectedCategoryFilter(null)
            setFilteredShops(shops)
            return
        }

        if (types.includes(category)) {
            result = result.filter(p => p.type.toLowerCase().includes(category.toLowerCase()))
            setSelectedCategoryFilter(category)
        }

        setFilteredShops(result);
    }

    const refreshShops = async () => {
        setLoaded(false)
        let allNewShop = await GetShops();
        setShops(allNewShop)
        setFilteredShops(allNewShop);
        setSearchData(defaultShopData);
        setLoaded(true)
    }

    useEffect(() => {
        refreshShops();
    }, []);

    useEffect(() => {
    }, [filteredShops, setFilteredShops]);

    return (
        <>
            <Header image={img} description={"Comé rico y económico"} description2={"salvando el planeta"} buttonTitle={"Comprá"} scrollHandler={scrollHandler} />
            <div ref={shopsRef} className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
                <Flex mt={4} mb="16px" direction={{ base: "column", sm: "row" }} justify={{ base: "center", sm: "flex-start" }}>
                    <Grid templateColumns='repeat(4, 2fr)' gap={2} mt={2}>
                        {types.map(type =>
                            <CategoryCard type={type} selected={type === selectedCategoryFilter} onClick={handleCategoryFilter} />
                        )}
                    </Grid>
                    <Flex direction="column" mr={{ base: "0", sm: "2px" }} mt={6} mb={0}>
                        <Input
                            value={searchData.neighborhood}
                            name="neighborhood"
                            onChange={handleSearch}
                            placeholder="Ingresá un barrio..."
                            size="md"
                            resize="none"
                        />
                    </Flex>
                </Flex>
                <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {
                        loaded ? filteredShops.map(shop =>
                            <ShopCard key={shop._id}
                                shop={shop}
                            />
                        ) : <ShopCardSkeleton />
                    }
                </div>
            </div >
        </>
    )
}

export default BuyerHome;