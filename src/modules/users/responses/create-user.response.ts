export const createUserResponse = {
  schema: {
    properties: {
      success: {
        type: 'boolean',
      },
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          email: { type: 'string' },
          userName: { type: 'string' },
          roles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          picture: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
    },
  },
};

//   data: {
//     type: 'object',
//     properties: {
//       id: {
//         type: 'number',
//       },
//       images: {
//         type: 'array',
//         items: {
//           type: 'string',
//         },
//       },
//       preferred_contact: {
//         type: 'string',
//       },
//       description: {
//         type: 'string',
//       },
//       summary: {
//         type: 'string',
//       },
//       screen: {
//         type: 'string',
//       },
//       issue_type: {
//         type: 'string',
//       },
//       name: {
//         type: 'string',
//       },
//       email: {
//         type: 'string',
//       },
//       updatedAt: {
//         type: 'string',
//       },
//       createdAt: {
//         type: 'string',
//       },
//       school: {
//         type: 'string',
//       },
//       classroom: {
//         type: 'string',
//       },
//       district: {
//         type: 'string',
//       },
//       text_book_name: {
//         type: 'string',
//       },
//       page_number: {
//         type: 'string',
//       },
//       assessment_name: {
//         type: 'string',
//       },
//       trello: {
//         type: 'boolean',
//       },
//     },
//   },
