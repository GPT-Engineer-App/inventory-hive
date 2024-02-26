import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Heading, Text, Button, Input, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const toast = useToast();

  const handleNewItemChange = (e) => {
    setNewItemName(e.target.value);
  };

  const handleAddItem = () => {
    if (newItemName.trim() === "") return;
    setItems([...items, { id: Date.now(), name: newItemName, quantity: 1 }]);
    setNewItemName("");
    toast({
      title: "Item added.",
      description: "We've added your item to the inventory.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const increaseQuantity = (itemId) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQuantity = (itemId) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item)));
  };

  const removeItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4} align="stretch">
          <Heading as="h1">Inventory Management System</Heading>
          <HStack>
            <Input placeholder="Enter item name" value={newItemName} onChange={handleNewItemChange} />
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddItem}>
              Add Item
            </Button>
          </HStack>
          <List spacing={3}>
            {items.map((item) => (
              <ListItem key={item.id} p={3} shadow="md" borderWidth="1px">
                <HStack justify="space-between">
                  <Text fontWeight="bold">{item.name}</Text>
                  <HStack>
                    <IconButton icon={<FaMinus />} onClick={() => decreaseQuantity(item.id)} isRound aria-label="Decrease quantity" />
                    <Text>{item.quantity}</Text>
                    <IconButton icon={<FaPlus />} onClick={() => increaseQuantity(item.id)} isRound aria-label="Increase quantity" />
                    <IconButton icon={<FaTrash />} onClick={() => removeItem(item.id)} isRound colorScheme="red" aria-label="Remove item" />
                  </HStack>
                </HStack>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
