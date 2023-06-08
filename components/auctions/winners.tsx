// src/components/Winners.tsx
import { Flex,Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import { IWinner } from "../../pages/auctions/my"; // Importar la interfaz IWinner desde auctions.tsx

interface WinnersProps {
  winners: IWinner[];
}

const Winners: React.FC<WinnersProps> = ({ winners }) => {
    return (
      <Box>
        <Heading as="h2" size="lg" mb="4">Ganadores Pasados</Heading>
  
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Producto</Th>
              <Th>Mes</Th>
              <Th isNumeric>Precio</Th>
              <Th>Ganador</Th>
              <Th>Categoría</Th>
            </Tr>
          </Thead>
          <Tbody>
            {winners.map((winner, index) => (
              <Tr key={index}>
                <Td>
                  <Flex align="center" justify="center">{winner.product}</Flex>
                </Td>
                <Td>
                  <Flex align="center" justify="center">{winner.month}</Flex>
                </Td>
                <Td isNumeric>
                  <Flex align="center" justify="center">${winner.price}</Flex>
                </Td>
                <Td>
                  <Flex align="center" justify="center">{winner.winner}</Flex>
                </Td>
                <Td>
                  <Flex align="center" justify="center">{winner.category}</Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };
  
export default Winners;
