import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  Thead,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

const Balance = () => {
  const [listProducts, setListProducts] = useState([]);
  const [productFiltered, setProductFiltered] = useState("");
  const [cmbProducts, setCmbProducts] = useState([]);

  const BuildBalanceArray = () => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : []; // pega lista de saidas

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : []; // pega lista de produtos

    const db_stock_entries = localStorage.getItem("db_stock_inputs")
      ? JSON.parse(localStorage.getItem("db_stock_inputs"))
      : []; // pega lista de entradas

    const newArray = [];

    db_products.map((prod) => {
      const entries = db_stock_entries // pega lista de entradas
        .filter((item) => item.product_id === prod.id) // filtra por id do produto
        .map((entry) => Number(entry.amount)) // pega somente a quantidade
        .reduce((acc, cur) => acc + cur, 0); // soma todos os valores

      const outputs = db_stock_outputs // pega lista de saidas
        .filter((item) => item.product_id === prod.id) // filtra por id do produto
        .map((output) => Number(output.amount)) // pega somente a quantidade
        .reduce((acc, cur) => acc + cur, 0); // soma todos os valores

      const total = Number(entries) - Number(outputs); // calcula o total

      newArray.push({
        product_id: prod.id,
        product_name: prod.name,
        amount: total,
      });

      setListProducts(newArray); // seta a lista
      setCmbProducts(newArray); // seta o combo
    });
  };

  useEffect(() => {
    BuildBalanceArray();
  }, []);

  const handleFilterProducts = () => {
    if (!productFiltered) {
      setListProducts(cmbProducts);
      return;
    }

    const newArray = cmbProducts.filter(
      (item) => item.product_id === productFiltered
    );

    setListProducts(newArray);
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Select
              value={productFiltered}
              onChange={(e) => setProductFiltered(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {cmbProducts &&
                cmbProducts.length > 0 &&
                cmbProducts.map((item, i) => (
                  <option key={i} value={item.product_id}>
                    {item.product_name}
                  </option>
                ))}
            </Select>
            <Button w="40" onClick={handleFilterProducts}>
              Filtrar
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    Produto
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Quantidade
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProducts &&
                  listProducts.length > 0 &&
                  listProducts.map((item, i) => (
                    <Tr key={i}>
                      <Td color="gray.500">{item.product_name}</Td>
                      <Td color="gray.500">{item.amount}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Balance;
