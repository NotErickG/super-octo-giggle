import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  TaskStatus: a.enum(['pending', 'completed']), // Separate enum for Task
  ActivityStatus: a.enum(['planned', 'ongoing', 'completed']), // Separate enum for Activity
  Student: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      profilePicture: a.url(),
      createdAt: a.datetime().default(new Date().toISOString()),
      tasks: a.hasMany('Task'),
      classes: a.hasMany('Class'),
      activities: a.hasMany('Activity'),
      parents: a.hasMany('Parent')
    })
    .authorization([
      a.allow.owner(),
      a.allow.private().to(['read']) // Only the owner and other authenticated users can read
    ]),

  Parent: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      contactInfo: a.phone(),
      students: a.hasMany('Student') // Parents can have multiple students
    })
    .authorization([
      a.allow.owner(),
      a.allow.private().to(['read']) // Only the owner and other authenticated users can read
    ]),

  Task: a
    .model({
      title: a.string().required(),
      description: a.string(),
      priority: a.enum(['low', 'medium', 'high']),
      dueDate: a.date(),
      assignedDate: a.date(),
      reminderDate: a.datetime(),
      status: a.ref('TaskStatus'), // Referencing the TaskStatus enum
      category: a.enum(['homework', 'personal', 'extracurricular']),
      visibility: a.enum(['public', 'private']),
      student: a.belongsTo('Student') // Linking task to a student
    }) 
    .authorization([
      a.allow.owner(),
      a.allow.private().to(['read']) // Only the owner (student) and other authenticated users can read
    ]),

  Class: a
    .model({
      name: a.string().required(),
      courseCode: a.string(),
      teacher: a.string(),
      location: a.string(),
      schedule: a.json(),
      semester: a.string(),
      year: a.integer(),
      description: a.string(),
      assignments: a.hasMany('Assignment')
    })
    .authorization([
      a.allow.private() // All authenticated users (students and parents) can access class information
    ]),

  Assignment: a
    .model({
      title: a.string().required(),
      description: a.string(),
      dueDate: a.date(),
      assignedDate: a.date(),
      points: a.integer(),
      relatedResources: a.json(), // Assuming relatedResources can be stored as JSON
      class: a.belongsTo('Class') // Linking assignment to a class
    })
    .authorization([
      a.allow.private() // All authenticated users (students and parents) can access assignment information
    ]),

  Activity: a
    .model({
      name: a.string().required(),
      type: a.enum(['club', 'sport', 'other']),
      description: a.string(),
      leader: a.string(),
      contactInfo: a.phone(),
      schedule: a.json(),
      status: a.ref('ActivityStatus'), // Referencing the ActivityStatus enum
      maxParticipants: a.integer()
    })
    .authorization([
      a.allow.private() // All authenticated users (students and parents) can access activity information
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
