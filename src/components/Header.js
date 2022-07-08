import {
  Avatar,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useSidebarContext } from "../contexts/SidebarContext";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const { isOpen, onOpen, onClose } = useSidebarContext();

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1120}
      h="20"
      mx="auto"
      px="2"
      py="2"
      align="center"
      boxShadow="0px 1px 0px #ccc"
      fontWeight="bold"
      color="gray.500"
    >
      {isMobile && (
        <IconButton
          icon={<Icon as={FiMenu} />}
          onClick={onOpen}
          variant="unstyled"
          fontSize="20"
          mr="2"
        ></IconButton>
      )}

      <Text>Logo</Text>

      <Flex ml="auto">
        <HStack>
          <Text>Jean Cavalcante</Text>

          <Avatar
            size="md"
            name="Ryan Florence"
            src="https://github.com/Jeann-Cavalcante.png"
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
