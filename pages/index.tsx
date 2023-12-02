import { useState } from 'react';
// import grid
import { Grid, Card } from '@aws-amplify/ui-react';

import { CreateTodo, Navbar, TodoList } from './components'; // Import the new component

export default function HomePage() {
  return (
    <main>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 3fr 1fr"
      >
        <Card
          columnStart="1"
          columnEnd="-1"
        >
          <Navbar />
        </Card>
        <Card
          columnStart="1"
          columnEnd="1"
        >
          <CreateTodo />
          <TodoList />
        </Card>
        <Card
          columnStart="2"
          columnEnd="-1"
        >
          Calendar
        </Card>
        {/* <Card
          columnStart="2"
          columnEnd="-1"
        >
          Footer
        </Card> */}
      </Grid>

    </main>
  );
}
