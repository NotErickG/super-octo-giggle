// utils/createTask.ts
import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'homework' | 'personal' | 'extracurricular';
export type TaskVisibility = 'public' | 'private';

interface TaskInput {
  title: string;
  description?: string;
  priority: TaskPriority | null;
  dueDate: string;
  assignedDate?: string | null;
  reminderDate?: string | null;
  category: TaskCategory | null;
  visibility: TaskVisibility | null;
}

export const createTask = async (taskData: TaskInput) => {
  const taskToCreate = {
    title: taskData.title,
    description: taskData.description || '',
    priority: taskData.priority, // Allow null
    dueDate: taskData.dueDate,
    assignedDate: taskData.assignedDate || null, // Allow null
    reminderDate: taskData.reminderDate || null, // Allow null
    category: taskData.category, // Allow null
    visibility: taskData.visibility, // Allow null
  };

  try {
    const { errors, data: newTask } = await client.models.Task.create(taskToCreate);

    if (errors) {
      console.error('Error creating task:', errors);
      throw new Error('Failed to create task');
    }

    return newTask;
  } catch (error) {
    console.error('Error in createTask function:', error);
    throw error;
  }
};
