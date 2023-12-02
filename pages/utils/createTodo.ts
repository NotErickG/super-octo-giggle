import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export type TodoPriority = 'low' | 'medium' | 'high';


interface TodoInput {
  title: string;
  priority: TodoPriority;
  dueDate: string;
}

export const createTodo = async (todoData: TodoInput) => {
  const { errors, data: newTodo } = await client.models.Todo.create({
    content: todoData.title,
    dueDate: todoData.dueDate,
    done: false,
    priority: todoData.priority,
  });
  console.log(errors, newTodo);
};
