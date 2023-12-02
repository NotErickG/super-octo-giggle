// index.tsx
import { useState } from 'react';
import { Grid, Card } from '@aws-amplify/ui-react';

import { Navbar, CreateTask, TaskList } from './components'; // Import your components

export default function HomePage() {
  // State or context can be used here if needed for global app state management

  return (
    <main>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 3fr 1fr"
      >
        <Card columnStart="1" columnEnd="-1">
          <Navbar />
        </Card>
        <Card columnStart="1" columnEnd="1">
          <CreateTask /> {/* Add the CreateTask component */}
          <TaskList />   {/* Add the TaskList component to display tasks */}
        </Card>
        <Card columnStart="2" columnEnd="-1">
          {/* Calendar component goes here */}
          {/* Uncomment and implement the Calendar component */}
        </Card>
        {/* Consider adding a Footer component or additional content if needed */}
      </Grid>
    </main>
  );
}
