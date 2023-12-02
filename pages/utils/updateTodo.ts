import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export const updateTodo = async (todoId: string, done: boolean) => {
  try {
    await client.models.Todo.update({ id: todoId, done });
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};
