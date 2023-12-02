import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export const useTodos = () => {
  const [todos, setTodos] = useState<Schema['Todo'][]>([]);

  useEffect(() => {
    const listTodos = async () => {
      const { data } = await client.models.Todo.list();
      setTodos(data);
    };

    listTodos();

    const sub = client.models.Todo.observeQuery()
      .subscribe(({ items }) => setTodos([...items]));
    
    return () => sub.unsubscribe();
  }, []);

  return todos;
};
