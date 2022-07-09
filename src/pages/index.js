import {
  Flex,
  Box,
  Button,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

export function Produtos() {
  const [name, setName] = useState("");
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];
    setListProducts(db_products);
  }, []);

  const handleNewProduct = () => {
    if (!name) return;

    if (verifyProductName()) {
      alert("Produto já cadastrado"); //TODO: melhorar mensagem
      return;
    }

    const id = Math.random().toString(36).substring(2);

    if (listProducts && listProducts.length > 0) {
      localStorage.setItem(
        "db_products",
        JSON.stringify([...listProducts, { id, name }]) // add lista
      );
      setListProducts([...listProducts, { id, name }]); // chamando lista
    } else {
      localStorage.setItem("db_products", JSON.stringify([{ id, name }]));
      setListProducts([{ id, name }]);
    }
    setName("");
  };

  const verifyProductName = () => {
    if (listProducts && listProducts.length > 0) {
      return listProducts.find((prod) => prod.name === name);
    }
    return false;
  };

  const removeProduct = (id) => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];
  };

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
