import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { database } from "../database/firebase";

export const AddTodo = () => {
  const [title, setTitle] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(database, "todos"), {
        title,
        completed: false,
      });
      toast({
        title: "Todo created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTitle("");
    }
  };

  return (
    <Flex alignItems="center" direction="column">
      <Text m="5rem" fontWeight="bold" fontSize="3rem">
        TodoList - Firebase
      </Text>
      <Flex as="form" direction="column" onSubmit={handleSubmit} w="50%">
        <Input
          type="text"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          bg="#B8D7D9"
          borderColor="black"
        />
        <Button type="submit" mt="1rem">
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};
