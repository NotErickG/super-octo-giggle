// components/CreateTask.tsx
import { useState } from 'react';
import { Flex, View, Button, TextField, SelectField } from '@aws-amplify/ui-react';
import { createTask } from '../utils';
import type { TaskPriority, TaskCategory, TaskVisibility } from '../utils'; // Define these types

export const CreateTask = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('low');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskAssignedDate, setTaskAssignedDate] = useState('');
  const [taskReminderDate, setTaskReminderDate] = useState('');
  const [taskCategory, setTaskCategory] = useState<TaskCategory>('personal');
  const [taskVisibility, setTaskVisibility] = useState<TaskVisibility>('private');

  const handleCreateClick = async () => {
    if (taskTitle) {
      await createTask({
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        dueDate: taskDueDate,
        assignedDate: taskAssignedDate,
        reminderDate: taskReminderDate,
        category: taskCategory,
        visibility: taskVisibility,
      });
      // Reset the form
      setTaskTitle('');
      setTaskDescription('');
      setTaskPriority('low');
      setTaskDueDate('');
      setTaskAssignedDate('');
      setTaskReminderDate('');
      setTaskCategory('personal');
      setTaskVisibility('private');
      setShowCreateForm(false);
    }
  };

  return (
    <View>
      <Button onClick={() => setShowCreateForm(true)}>Create Task</Button>
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
            label="Task Title"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <TextField
            label="Description"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <SelectField
            label="Priority"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </SelectField>
          <TextField
            type="date"
            label="Due Date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />
          <TextField
            type="date"
            label="Assigned Date"
            value={taskAssignedDate}
            onChange={(e) => setTaskAssignedDate(e.target.value)}
          />
          <TextField
            type="datetime-local"
            label="Reminder Date"
            value={taskReminderDate}
            onChange={(e) => setTaskReminderDate(e.target.value)}
          />
          <SelectField
            label="Category"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value as TaskCategory)}
          >
            <option value="homework">Homework</option>
            <option value="personal">Personal</option>
            <option value="extracurricular">Extracurricular</option>
          </SelectField>
          <SelectField
            label="Visibility"
            value={taskVisibility}
            onChange={(e) => setTaskVisibility(e.target.value as TaskVisibility)}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </SelectField>
          <Button onClick={handleCreateClick}>Create</Button>
          <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
        </Flex>
      )}
    </View>
  );
};

export default CreateTask;