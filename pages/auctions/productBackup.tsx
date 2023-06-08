// Product.tsx
import { Box, Image, Button, Text } from "@chakra-ui/react";

interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  currentBid: number;
}

// Product.tsx

interface IWinner {
  product: string;
  month: string;
  price: number;
  winner: string;
} 


interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const handleBid = async () => {
    
    const newBid = window.prompt(`Enter your bid for ${product.name}. The current bid is ${product.currentBid}`);
    
    if(newBid){
      
      const response = await fetch('/api/bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          bid: newBid
        })
      });
      const data = await response.json();
      if(!response.ok){
        // maneja el error
        alert(`Error: ${data.message}`);
      } else {
        alert(`Successfully bid $${newBid} on ${product.name}`);
      }
    }
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.image} alt={product.name} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Text
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {product.name}
          </Text>
        </Box>

        <Text mt="2">{product.description}</Text>

        <Text mt="2" color="teal.500">
          Current Bid: ${product.currentBid}  {/* mostramos el precio actual de la oferta */}
        </Text>

        <Button colorScheme="blue" onClick={handleBid} mt="3">
          Bid
        </Button>
      </Box>
    </Box>
  );
};

export default Product;

