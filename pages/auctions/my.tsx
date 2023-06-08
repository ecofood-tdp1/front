// src/pages/auctions.tsx
// src/pages/auctions.tsx
import { StaticImageData } from "next/image";
import { Flex, Text, Select, SimpleGrid, Center, Box, Heading} from "@chakra-ui/react";
import Product from "../../components/auctions/products";
import Winners from "../../components/auctions/winners";
// Importar la interfaz IProduct desde auctions.tsx
// el atributo image contiene la imagen del producto
import { useState } from "react";

export interface IProduct {
  id: number;
  name: string;
  imageURL: StaticImageData | string;
  price: number;
  category: string;  
  lastBidder: string;
}

export interface IWinner {
  product: string;
  month: string;
  price: number;
  winner: string;
  category: string; 
}

import image1 from '../../public/premiunlogo.jpeg';

import image2 from '../../public/premiunlogo.jpeg';


const products: IProduct[] = [
  {
    id: 1,
    name: "Publicidad tipo 1",
    imageURL: image1,
    price: 10000,
    category: "restaurantes",
    lastBidder: "Picollo Pane"
  },
  {
    id: 5,
    name: "Publicidad tipo 1",
    imageURL: image1,
    price: 10000,
    category: "cafes",
    lastBidder: "Cafe Martinez"
  },
  {
    id: 6,
    name: "Publicidad tipo 1",
    imageURL: image1,
    price: 10000,
    category: "verdulerias",
    lastBidder: "Verde Vivo"
  },
  {
    id: 2,
    name: "Publicidad tipo 2",
    imageURL: image2,
    price: 5000,
    category: "restaurantes",
    lastBidder: "Picollo Pane"
  },
  {
    id: 3,
    name: "Publicidad tipo 2",
    imageURL: image2,
    price: 1500,
    category: "supermercados",
    lastBidder: "coto"
  },
  {
    id: 4,
    name: "Publicidad tipo 2",
    imageURL: image2,
    price: 500,
    category: "supermercados",  
    lastBidder: "carrefour"
  },
  {
    id: 7,
    name: "Publicidad tipo 1",
    imageURL: image2,
    price: 500,
    category: "supermercados",  
    lastBidder: "Dia"
  },
]

const winners: IWinner[] = [
  { product: "Publicidad Tipo 1", month: "Enero", price: 10000, winner: "Picollo Pane" , category: "panaderias"},
  { product: "Publicidad Tipo 1", month: "Febrero", price: 10000, winner: "Picollo Pane" , category: "panaderias"},
  { product: "Publicidad Tipo 2", month: "Enero", price: 15000, winner: "Cafe Martinez" , category: "panaderias"},
  { product: "Publicidad Tipo 1", month: "Febrero", price: 2000, winner: "El galeon del norte", category: "restaurantes" },
  { product: "Publicidad Tipo 1", month: "Marzo", price: 2500, winner: "La continental", category: "restaurantes" },
  { product: "Publicidad Tipo 1", month: "Marzo", price: 2500, winner: "Coto", category: "supermercados" },
  { product: "Publicidad Tipo 1", month: "Marzo", price: 2500, winner: "Coto", category: "supermercados" },
  { product: "Publicidad Tipo 2", month: "Febrero", price: 2500, winner: "Dia", category: "supermercados" },
  { product: "Publicidad Tipo 2", month: "Abril", price: 2500, winner: "Dia", category: "supermercados" },
  { product: "Publicidad Tipo 1", month: "Junio", price: 2500, winner: "Dia", category: "supermercados" },
];

const Auctions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory === "todos"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const filteredWinners = selectedCategory === "todos"
    ? winners
    : winners.filter(winner => winner.category === selectedCategory);

  return (
    <>
      <Heading as="h1" size="xl" textAlign="center" mt="10" mb="4" color="gray.700" textShadow="1px 1px gray">
        Subastas
      </Heading>
      <Center>
        <Box w={['100%', '80%', '60%']}>
        <Flex direction="column" ml="32px"> {/* Added ml (margin-left) */}
            <Text mb="8px">Elegir por categoria:</Text>
            <Select mb="8px" placeholder="Elegir una opción" name="type" onChange={handleChange} >
              <option value="todos">Todos</option>
              <option value="restaurantes">🍴 Restaurantes </option>
              <option value="supermercados">🛒 Supermercados </option>
              <option value="panaderias">🥐 Panaderias</option>
              <option value="cafes"> ☕ cafes </option>
              <option value="verduleria"> 🥑 verdulerias </option>
            </Select>
          </Flex>

          <SimpleGrid columns={[1, null, 2]} spacing={10} mb="10" mt="10">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </SimpleGrid>
          <Winners winners={filteredWinners} />
        </Box>
      </Center>
    </>
  );
};

export default Auctions;