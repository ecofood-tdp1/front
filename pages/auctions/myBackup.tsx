// Auctions.tsx
import { SimpleGrid, Center, Box, Table, Thead, Tbody, Tr, Th, Td, Heading} from "@chakra-ui/react";
import Product from "../../components/auctions/product";
import IWinner from "../../components/auctions/product";

interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  currentBid: number;
}

interface IWinner {
  product: string;
  month: string;
  price: number;
  winner: string;
}  
const Auctions: React.FC = () => {
  // Para este ejemplo, estoy suponiendo que tienes algunos productos hardcodeados.
  // En una aplicación real, probablemente obtendrías estos datos desde una API.
  
  const products: IProduct[] = [
    {
      id: "1",
      name: "Product 1",
      description: "This is an amazing product",
      image: "https://via.placeholder.com/150",
      currentBid: 0,
    },
    {
      id: "2",
      name: "Product 2",
      description: "This is another amazing product",
      image: "https://via.placeholder.com/150",
      currentBid: 10,

    },
    {
      id: "3",
      name: "Product 3",
      description: "This is another amazing product",
      image: "https://via.placeholder.com/150",
      currentBid: 10,

    },
    {
      id: "4",
      name: "Product 4",
      description: "This is another amazing product",
      image: "https://via.placeholder.com/150",
      currentBid: 10,

    }]

    // ... más productos
    const winners: IWinner[] = [
      { product: "Product 1", month: "January", price: 150, winner: "Alice" },
      { product: "Product 2", month: "February", price: 200, winner: "Bob" },
      { product: "Product 3", month: "March", price: 250, winner: "Charlie" },
      // etc.
    ];
  ;

  return (
    
   
      <Center>
        <Box w={['100%', '80%', '60%']} >
          
          <Heading as="h1" size="lg" mb="4" mt="4">Subastas</Heading>
          <SimpleGrid columns={[1, null, 2]} spacing={10} mb="10" mt="4">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </SimpleGrid>
            
          <Heading as="h2" size="lg" mb="4">Ganadores Pasados</Heading> 
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Month</Th>
                <Th isNumeric>Price</Th>
                <Th>Winner</Th>
              </Tr>
            </Thead>
            <Tbody>
              {winners.map((winner, index) => (
                <Tr key={index}>
                  <Td>{winner.product}</Td>
                  <Td>{winner.month}</Td>
                  <Td isNumeric>${winner.price}</Td>
                  <Td>{winner.winner}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    );
  };
  
  export default Auctions;

