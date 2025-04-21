import React, { use } from 'react';
import { Text, VStack , Container, SimpleGrid} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';
import { toaster,Toaster } from "@/components/ui/toaster";

const Homepage = () => {

  const {fetchProducts,products}= useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);
  console.log(products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          bgGradient="to-r" gradientFrom="red.500" gradientTo="cyan.300"
          bgClip={"text"}

          >
          Products
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={15} w="full">


          {products.map((product)=>(
            <ProductCard key={product._id} product={product} /> 
          ))}
        </SimpleGrid>
        <Toaster />


        {products.length === 0 && (
          <Text fontSize="2xl" textAlign="center" color="gray.600" fontWeight="semibold">
          No products available at the moment.
          <Link to={"/create"}><Text as="span" color ="blue.500" _hover={{textDecoration:"underline"}} >Create a Product</Text></Link>
        </Text>
        )}

      </VStack>

    </Container>
  )
}

export default Homepage;