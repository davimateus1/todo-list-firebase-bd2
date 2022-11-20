import { AddTodo } from "./components/AddTodo";
import { Todo } from "./components/Todo";

import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { database } from "./database/firebase";
import { useEffect, useState } from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { TodoType } from "./types/types";

const App = () => {
  const [allTodo, setAllTodo] = useState<TodoType[]>([]);
  const toast = useToast();

  useEffect(() => {
    const q = query(collection(database, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArray: TodoType[] | any = [];
      querySnapshot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id });
      });
      setAllTodo(todoArray);
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = async (todo: TodoType, title: string) => {
    await updateDoc(doc(database, "todos", todo.id), { title: title });
    toast({
      title: "Todo updated!",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleComplete = async (todo: TodoType) => {
    await updateDoc(doc(database, "todos", todo.id), {
      completed: !todo.completed,
    });
    toast({
      title: !todo.completed ? "Todo completed!" : "Todo uncompleted!",
      status: !todo.completed ? "success" : "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRemove = async (id: string) => {
    await deleteDoc(doc(database, "todos", id));
    toast({
      title: "Todo deleted!",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex maxW="100vw" minH="100vh" h="auto" direction="column" bg="#BDE4E3">
      <AddTodo />
      <Flex
        w="100%"
        direction="column"
        justify="center"
        align="center"
        mt="1rem"
      >
        {allTodo.length === 0 ? (
          <Text fontSize="2rem" fontWeight="bold">
            No todos yet!
          </Text>
        ) : (
          allTodo.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleEdit={handleEdit}
              toggleComplete={toggleComplete}
              handleRemove={handleRemove}
            />
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default App;
