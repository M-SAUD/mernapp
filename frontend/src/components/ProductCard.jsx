import React, {useState} from 'react'
import { Box,Image,Heading,Text, IconButton , HStack, VStack, Input} from '@chakra-ui/react'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode.jsx";
import { toaster,Toaster } from "@/components/ui/toaster";
import { useProductStore } from '../store/product.js';
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"



const ProductCard = ({product}) => {

    const textColor= useColorModeValue("gray.700", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const [open, setOpen] = useState(false);

    const [updatedProduct, setUpdatedProduct] = useState(product);
    


    

    const {deleteProduct,updateProduct}=useProductStore();


    const handleUpdateProduct = async (pid,updatedProduct) => {
     const {success,message}= await updateProduct(pid,updatedProduct);
     if(!success){
      toaster.create({
          title: `Error in Updating Product`,
          description: message,
          type: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right", 
        })
  }else{
      toaster.create({
          title: `Success`,
          description: `Product Updated Successfully`,
          type: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right", 
        })
  }
    }
    
    const handleDeleteProduct = async (pid) => {

        const {success,message}= await deleteProduct(pid);
        console.log(success,message)
        if(!success){
            toaster.create({
                title: `Error in Deleting Product`,
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
        }
        

    }

  return (
    <Box shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    bg={bg}>

        <Image src={product.imageUrl} alt={product.name} h={48} w='full' objectFit='cover' />
        


        <Box p={4}>
            {/* <Box fontSize='xl' fontWeight='bold' color='gray.700'>{product.name}</Box>
            <Box fontSize='lg' color='gray.500'>${product.price}</Box>
            <Box fontSize='md' color='gray.600'>{product.description}</Box> */}

            <Heading as='h3' size='lg' mb={2} color='gray.700'>{product.name}</Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor}>${product.price}</Text>
            <Text fontWeight='semibold' fontSize='xl' color='gray.600'>Units {product.countInStock}</Text>

            <HStack spacing={2}>

            <Dialog.Root lazyMount open={open} onOpenChange={(e)=>setOpen(e.open)}>

      <Dialog.Trigger asChild>
      <IconButton >
    <MdOutlineModeEdit />
  </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>update Products</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack spacing={4}>
                <Input placeholder="Product Name" name='name' value={updatedProduct.name} onChange={(e)=>setUpdatedProduct({...updatedProduct,name:e.target.value})} />
                <Input placeholder="Product Description" name='description' value={updatedProduct.description} onChange={(e)=>setUpdatedProduct({...updatedProduct,description:e.target.value})}  />
                <Input placeholder="Product Price" name='price' type='number' value={updatedProduct.price} onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})}/>
                <Input placeholder="Product Count In Stock" name='stocks' value={updatedProduct.countInStock} onChange={(e)=>setUpdatedProduct({...updatedProduct,countInStock:e.target.value})}/>
                <Input placeholder="Product Image URL" name='image' value={updatedProduct.imageUrl} onChange={(e)=>setUpdatedProduct({...updatedProduct,imageUrl:e.target.value})}/>
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" >Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={()=>{handleUpdateProduct(product._id,updatedProduct);setOpen(false);}}>Update</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
                <IconButton onClick={()=>handleDeleteProduct(product._id)}>< MdDeleteOutline /></IconButton>
                </HStack>
            </Box>

            
             


           
       


    </Box>
  )
}

export default ProductCard