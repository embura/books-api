define({ api: [
  {
    type: 'delete',
    url: '/tasks/:id',
    title: 'Remove a task',
    group: 'Tasks',
    parameter: {
      fields: {
        Parameter: [
          {
            group: 'Parameter',
            type: 'id',
            optional: false,
            field: 'id',
            description: '<p>Task id</p>',
          },
        ],
      },
    },
    success: {
      examples: [
        {
          title: 'Success',
          content: 'HTTP/1.1 204 No Content',
          type: 'json',
        },
      ],
    },
    error: {
      examples: [
        {
          title: 'Delete error',
          content: 'HTTP/1.1 500 Internal Server Error',
          type: 'json',
        },
      ],
    },
    version: '0.0.0',
    filename: 'routes/users.js',
    groupTitle: 'Tasks',
    name: 'DeleteTasksId',
  },
] });
