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

function StockOutputs() {
  const [amount, setAmount] = useState("");
  const [product_id, setProduct_id] = useState("0");
  const [listStockOutputs, setListStockOutputs] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    setListStockOutputs(db_stock_outputs);

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    setListProducts(db_products);
  }, []);

  const handleNewOutputs = () => {
    if (!amount || !product_id || product_id === "0") {
      alert("Preencha todos os campos"); // melhorar isso
      return;
    }

    const id = Math.random().toString(36).substring(2);

    if (listStockOutputs && listStockOutputs.length) {
      // se tiver lista
      localStorage.setItem(
        "db_stock_outputs",
        JSON.stringify([...listStockOutputs, { id, amount, product_id }]) // add lista antiga e atualiza
      );
      setListStockOutputs([...listStockOutputs, { id, amount, product_id }]); // chamando lista
    } else {
      localStorage.setItem(
        "db_stock_outputs",
        JSON.stringify([{ id, amount, product_id }]) // So add lista nova
      );
      setListStockOutputs([{ id, amount, product_id }]); // chamando lista nova
    }

    setAmount("");
    setProduct_id("0");
  };

  const removeOutputs = (id) => {
    const newArray = listStockOutputs.filter((item) => item.id !== id); // nova lista sem o item

    localStorage.setItem("db_stock_outputs", JSON.stringify(newArray)); // atualiza localStorage

    setListStockOutputs(newArray); // atualiza lista
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

            <Button w="40" onClick={handleNewOutputs}>
              Salvar
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
                {listStockOutputs.map((item, i) => (
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
                        onClick={() => removeOutputs(item.id)}
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

export default StockOutputs;
