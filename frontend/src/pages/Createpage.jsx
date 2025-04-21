import React, { use } from 'react'
import {useState} from "react"
import { Container, VStack,Heading,Box,Input,Button} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from "@/components/ui/color-mode"
import { useProductStore } from '../store/product'
import { Toaster,toaster } from "@/components/ui/toaster"

const Createpage = () => {

  const [newproduct, setNewproduct] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    imageUrl: "",
  })
   
  const {createProduct}=useProductStore()
  const handleAddProduct = async() => {
   const{success,message}= await createProduct(newproduct);
   console.log(success,message)
   if(!success){
    toaster.create({
      title: `Error in Creating Product`,
      description: message,
      type: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right", 
    })
}else{
  toaster.create({
    title: `Success`,
    description: message,
    type: "success",
    duration: 3000,
    isClosable: true,
    position: "top-right", 
  
  })
  setNewproduct({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    imageUrl: "",
  });

}




  };
  return (
    <Container maxW={"container.sm"} >
      <VStack
      spacing={8}>
        <Heading as = "h1" size="2xl" textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} boxShadow={"2xl"} rounded={"md"} p={8} >
          <VStack spacing={4}>
            <Input placeholder='Product Name'
            name='name'
            value={newproduct.name}
            onChange={(e)=>setNewproduct({...newproduct,name:e.target.value})}/>

            <Input
            placeholder='Product Description'
            name='description'  
            value={newproduct.description}
            onChange={(e)=>setNewproduct({...newproduct,description:e.target.value})}/>

             
            <Input
            placeholder='Product Price'
            name='price'
            type='number' 
            value={newproduct.price}
            onChange={(e)=>setNewproduct({...newproduct,price:e.target.value})}/>
               
                
                <Input
                placeholder='Stocks'
                name='countInStock'
                type='number' 
                value={newproduct.countInStock}
                onChange={(e)=>setNewproduct({...newproduct,countInStock:e.target.value})}/>


             <Input
            placeholder='Product Image' 
            name='imageUrl'  
            value={newproduct.imageUrl}
            onChange={(e)=>setNewproduct({...newproduct,imageUrl:e.target.value})}/>

           
            
            
            <Button 
            colorScheme='blue' onClick={handleAddProduct} w={"full"}>
              Add Product
              
            </Button>

        

          </VStack>
          
        </Box>


      </VStack>
      <Toaster />
        </Container>
  )
}

export default Createpage