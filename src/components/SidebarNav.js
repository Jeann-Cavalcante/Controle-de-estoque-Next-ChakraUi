import { Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarNav = () => {
  const { asPath } = useRouter();

  return (
    <Stack spacing={4}>
      <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400">
          Cadastro
        </Text>
      </Stack>

      <Stack>
        <ChakraLink
          _hover={{ color: "gray.100" }}
          px="4"
          py="2"
          borderRadius={5}
          bg={asPath === "/" ? "gray.200" : ""}
        >
          <Link href="/">
            <Text fontSize="xs" fontWeight="bold" color="gray.400">
              Produtos
            </Text>
          </Link>
        </ChakraLink>
      </Stack>

      <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400">
          Estoque
        </Text>
      </Stack>

      <Stack>
        <ChakraLink
          _hover={{ color: "gray.100" }}
          px="4"
          py="2"
          borderRadius={5}
          bg={asPath === "/balance" ? "gray.200" : ""}
        >
          <Link href="/balance">
            <Text fontSize="md" fontWeight="medium" color="gray.500">
              Saldo
            </Text>
          </Link>
        </ChakraLink>

        <Stack>
          <ChakraLink
            _hover={{ color: "gray.100" }}
            px="4"
            py="2"
            borderRadius={5}
            bg={asPath === "/balance" ? "gray.200" : ""}
          >
            <Link href="/balance">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                Saída
              </Text>
            </Link>
          </ChakraLink>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SidebarNav;
