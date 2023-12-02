import { generateClient } from 'aws-amplify/api';
import { Schema } from '@/amplify/data/resource'; // Adjust the path as necessary

const client = generateClient<Schema>();

export const deleteTodo = async (todoId: string) => {
  try {
    const toBeDeletedTodo = {
      id: todoId
    };

    const { data: deletedTodo, errors } = await client.models.Todo.delete(toBeDeletedTodo);

    if (errors) {
      console.error('Error deleting todo:', errors);
      return null;
    }

    return deletedTodo;
  } catch (error) {
    console.error('Error in deleteTodo function:', error);
    return null;
  }
};
