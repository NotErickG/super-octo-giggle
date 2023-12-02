import { Flex, Table, CheckboxField, Button, TableCell, TableRow, TableBody, TableHead, Text } from '@aws-amplify/ui-react';
import { Schema } from '@/amplify/data/resource';
import { updateTodo, deleteTodo } from '../utils';
import { useTodos } from '../hooks';
import { VisuallyHidden } from '@aws-amplify/ui-react'; // Import VisuallyHidden for accessibility


export const TodoList = () => {
  const todos = useTodos();

  const handleTodoToggle = async (todoId: string, done: boolean) => {
    await updateTodo(todoId, done);
  };

  const handleDeleteTodo = async (todoId: string) => {
    await deleteTodo(todoId);
    // Optionally, update the state or re-fetch the todos to reflect the deletion
  };

  return (
    <Table highlightOnHover>
      <TableHead>
        <TableRow>
          <TableCell as="th">Title</TableCell>
          <TableCell as="th">Priority</TableCell>
          <TableCell as="th">Due Date</TableCell>
          <TableCell as="th">Completed</TableCell>
          <TableCell as="th">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todos.map(todo => (
          <TableRow key={todo.id}>
            <TableCell><Text>{todo.content}</Text></TableCell>
            <TableCell><Text>{todo.priority}</Text></TableCell>
            <TableCell><Text>{todo.dueDate}</Text></TableCell>
            <TableCell>
              <VisuallyHidden>
                <label htmlFor={`todo-done-${todo.id}`}>Mark as Done</label>
              </VisuallyHidden>
              <CheckboxField
                label="" // Provide an empty string as label
                id={`todo-done-${todo.id}`}
                name={`todo-done-${todo.id}`}
                checked={todo.done || false}
                onChange={() => handleTodoToggle(todo.id, !todo.done)}
              />
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoList;
