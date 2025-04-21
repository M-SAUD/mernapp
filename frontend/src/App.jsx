
import {Box, Flex} from "@chakra-ui/react"
import { Routes } from "react-router-dom"
import HomePage from "./pages/Homepage.jsx"
import { Route } from "react-router-dom"
import CreatePage from "./pages/Createpage.jsx"
import Navbar from "./components/Navbar.jsx"
import React from "react"
import {useColorModeValue,} from "@/components/ui/color-mode"
function App() {
 

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
