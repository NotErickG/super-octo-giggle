import { useState } from 'react';
import { Flex, View, Button, TextField, SelectField } from '@aws-amplify/ui-react';
import { createTodo } from '../utils/index'; // Adjust the import path as necessary
import type { TodoPriority } from '../utils/createTodo';

export const CreateTodo = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoPriority, setTodoPriority] = useState<TodoPriority>('low');
  const [todoDueDate, setTodoDueDate] = useState('');

  const handleCreateClick = async () => {
    if (todoTitle) {
      await createTodo({
        title: todoTitle,
        priority: todoPriority,
        dueDate: todoDueDate,
      });
      // Reset the form and close it
      setTodoTitle('');
      setTodoPriority('low');
      setTodoDueDate('');
      setShowCreateForm(false);
    }
  };

  return (
    <View>
      <Button onClick={() => setShowCreateForm(true)}>Create Todo</Button>
      {showCreateForm && (
        <Flex
          direction="column"
          alignItems="center"
          gap="1rem"
          padding="1rem"
          backgroundColor="var(--amplify-colors-background-secondary)"
          borderRadius="var(--amplify-radii-medium)"
          boxShadow="var(--amplify-shadows-small)"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <TextField
            label="Todo Title"
            placeholder="Enter todo title"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <SelectField
            label="Priority"
            value={todoPriority}
            onChange={(e) => setTodoPriority(e.target.value as TodoPriority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </SelectField>
          <TextField
            type="date"
            label="Due Date"
            value={todoDueDate}
            onChange={(e) => setTodoDueDate(e.target.value)}
          />
          <Button onClick={handleCreateClick}>Create</Button>
          <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
        </Flex>
      )}
    </View>
  );
};

export default CreateTodo;
