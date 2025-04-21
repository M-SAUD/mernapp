import React from 'react'
import { Container, Flex, Text, HStack, Button } from '@chakra-ui/react'
import {useColorMode,} from "@/components/ui/color-mode"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { Link } from 'react-router-dom'
import { Icon } from "@chakra-ui/react"
import { HiHeart } from "react-icons/hi"
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px ={4} >
    <Flex
    h={16}
    alignItems={"center"}
    justifyContent={"space-between"}
    flexDir={{
      base: "column",
      sm: "row"
    }}>

   <Text
   fontSize={{base: "28px", sm: "22px"}}
   fontWeight={"bold"}
   textTransform={"uppercase"}
   textAlign={"center"} 
   bgGradient="to-r" gradientFrom="red.500" gradientTo="cyan.300"
   bgClip={"text"}
   >
    <Link to="/">Product Store</Link>
   </Text>

   <HStack spacing={"2"} alignItems={"center"}>
      <Link to={"/create"}>
      <Button>
      <Icon fontSize={"20px"} color={"red.700"}>

    <HiHeart />
  </Icon>
      </Button>
      </Link>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <IoMoon/> : <LuSun/>}

      </Button>
   </HStack>

    </Flex>
    </Container>
  )
}

export default Navbar