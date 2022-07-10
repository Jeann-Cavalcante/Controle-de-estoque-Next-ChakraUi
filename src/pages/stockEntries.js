import {
  Box,
  Button,
  Flex,
  Input,
  Select,
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

function StockEntries() {
  const [amount, setAmount] = useState("");
  const [product_id, setProduct_id] = useState("0");
  const [listStockEntries, setListStockEntries] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    setListStockEntries(db_stock_entries);

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    setListProducts(db_products);
  }, []);

  const handleNewEntry = () => {
    if (!amount || !product_id || product_id === "0") {
      alert("Preencha todos os campos"); // melhorar isso
      return;
    }

    const id = Math.random().toString(36).substring(2);

    if (listStockEntries && listStockEntries.length) {
      // se tiver lista
      localStorage.setItem(
        "db_stock_entries",
        JSON.stringify([...listStockEntries, { id, amount, product_id }]) // add lista antiga e atualiza
      );
      setListStockEntries([...listStockEntries, { id, amount, product_id }]); // chamando lista
    } else {
      localStorage.setItem(
        "db_stock_entries",
        JSON.stringify([{ id, amount, product_id }]) // So add lista nova
      );
      setListStockEntries([{ id, amount, product_id }]); // chamando lista nova
    }

    setAmount("");
    setProduct_id("0");
  };

  const removeEntries = (id) => {
    const newArray = listStockEntries.filter((item) => item.id !== id); // nova lista sem o item

    localStorage.setItem("db_stock_entries", JSON.stringify(newArray)); // atualiza localStorage

    setListStockEntries(newArray); // atualiza lista
  };

  const getProductById = (id) => {
    return listProducts.find((item) => item.id === id).name; // retorna o nome do produto
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Select
              value={product_id}
              onChange={(e) => setProduct_id(e.target.value)}
            >
              <option value="0">Selecione um produto</option>
              {listProducts &&
                listProducts.length > 0 &&
                listProducts.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>

            <Input
              placeholder="Quantidade"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button w="40" onClick={handleNewEntry}>
              Adicionar
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    Nome
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Qtd.
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {listStockEntries.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{getProductById(item.product_id)}</Td>
                    <Td color="gray.500">{item.amount}</Td>
                    <Td>
                      <Button
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="red.500"
                        fontWeight="bold"
                        onClick={() => removeEntries(item.id)}
                      >
                        Excluir
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default StockEntries;
