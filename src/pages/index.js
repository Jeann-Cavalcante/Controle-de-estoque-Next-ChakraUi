import { Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export function Produtos() {
  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />
      </Flex>
    </Flex>
  );
}

export default Produtos;
