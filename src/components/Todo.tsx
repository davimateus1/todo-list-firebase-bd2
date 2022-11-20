import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";

import {
  AiFillCheckCircle,
  AiFillEdit,
  AiFillCloseCircle,
} from "react-icons/ai";
import { TodoComponent } from "../types/types";

export const Todo = ({
  todo,
  toggleComplete,
  handleEdit,
  handleRemove,
}: TodoComponent) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (todo.complete) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <Flex w="50%" h="100%" justify="center" align="center">
      <Input
        type="text"
        style={{ textDecoration: todo.completed && "line-through" }}
        value={todo.title === "" ? newTitle : todo.title}
        onChange={handleChange}
        bg="#FEE9CC"
        borderColor="black"
        m="1rem"
      />
      <Flex>
        <Button m="0.5rem" onClick={() => toggleComplete(todo)}>
          <AiFillCheckCircle color="green" />
        </Button>
        <Button m="0.5rem" onClick={() => handleEdit(todo, newTitle)}>
          <AiFillEdit color="gold" />
        </Button>
        <Button m="0.5rem" onClick={() => handleRemove(todo.id)}>
          <AiFillCloseCircle color="red" />
        </Button>
      </Flex>
    </Flex>
  );
};
