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


const products: IProduct[] = [
  {
    id: 1,
    name: "publicidad prioritaria tipo 1",
    imageURL: image1,
    price: 0,
    category: "restaurantes",
    lastBidder: "Picollo Pane"
  },
  {
    id: 2,
    name: "publicidad prioritaria tipo 2",
    imageURL: image1,
    price: 10,
    category: "restaurantes",
    lastBidder: "Picollo Pane"
  },
  {
    id: 3,
    name: "publicidad prioritaria tipo 3",
    imageURL: image1,
    price: 10,
    category: "supermercados",
    lastBidder: "coto"
  },
  {
    id: 4,
    name: "publicidad prioritaria tipo 4",
    imageURL: image1,
    price: 10,
    category: "supermercados",  
    lastBidder: "carrefour"
  },
]

const winners: IWinner[] = [
  { product: "Publicidad prioritaria", month: "Enero", price: 150, winner: "Picollo Pane" , category: "restaurantes"},
  { product: "Publicidad secundaria", month: "Enero", price: 150, winner: "Picollo Pane" , category: "restaurantes"},
  { product: "Primeras posiciones", month: "Febrero", price: 200, winner: "El galeon del norte", category: "restaurantes" },
  { product: "Primeras posiciones", month: "Marzo", price: 250, winner: "La continental", category: "restaurantes" },
  { product: "Segundas posiciones", month: "Marzo", price: 250, winner: "Coto", category: "supermercados" },
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
      <Heading as="h1" size="xl" textAlign="center" mt="10" mb="4" color="gray.700" fontFamily="Nimbus" textShadow="1px 1px gray">
        Subastas
      </Heading>
      <Center>
        <Box w={['100%', '80%', '60%']}>
        <Flex direction="column" ml="32px"> {/* Added ml (margin-left) */}
            <Text mb="8px">Elegir por categoria:</Text>
            <Select mb="8px" placeholder="Elegir una opción" name="type" onChange={handleChange} >
              <option value="todos">Todos</option>
              <option value="restaurantes">🍴 Restaurante</option>
              <option value="supermercados">🛒 Supermercado</option>
              <option value="panaderia">🥐 Panadería</option>
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