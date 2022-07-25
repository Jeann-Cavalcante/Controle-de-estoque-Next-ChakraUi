import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const SidebarContext = createContext({});

export const SidebarProvider = (props) => {
  const disclosure = useDisclosure();
  return (
    <SidebarContext.Provider value={disclosure}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
