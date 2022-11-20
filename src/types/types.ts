export type TodoType = {
  id: string;
  title: string;
  complete: boolean;
  completed: string;
};

export type TodoComponent = {
  todo: TodoType;
  toggleComplete: (todo: TodoType) => void;
  handleEdit: (todo: TodoType, newTitle: string) => void;
  handleRemove: (id: string) => void;
};
