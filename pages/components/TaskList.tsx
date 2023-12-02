// components/TaskList.tsx
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';
import { Table, TableCell, TableRow, TableBody, TableHead, Text, Button } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

export const TaskList = () => {
  const [tasks, setTasks] = useState<Schema['Task'][]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data: fetchedTasks } = await client.models.Task.list();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Table highlightOnHover>
      <TableHead>
        <TableRow>
          <TableCell as="th">Title</TableCell>
          <TableCell as="th">Description</TableCell>
          <TableCell as="th">Priority</TableCell>
          <TableCell as="th">Due Date</TableCell>
          <TableCell as="th">Assigned Date</TableCell>
          <TableCell as="th">Reminder Date</TableCell>
          <TableCell as="th">Category</TableCell>
          <TableCell as="th">Visibility</TableCell>
          <TableCell as="th">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(task => (
          <TableRow key={task.id}>
            <TableCell><Text>{task.title}</Text></TableCell>
            <TableCell><Text>{task.description}</Text></TableCell>
            <TableCell><Text>{task.priority}</Text></TableCell>
            <TableCell><Text>{task.dueDate}</Text></TableCell>
            <TableCell><Text>{task.assignedDate}</Text></TableCell>
            <TableCell><Text>{task.reminderDate}</Text></TableCell>
            <TableCell><Text>{task.category}</Text></TableCell>
            <TableCell><Text>{task.visibility}</Text></TableCell>
            <TableCell><Text>{JSON.stringify(task)}</Text></TableCell>
            <TableCell>
              {/* Add any action buttons here, such as edit or delete */}
              <Button onClick={() => {/* handle delete */}}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskList;
