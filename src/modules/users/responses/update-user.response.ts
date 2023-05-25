export const updateUserResponse = {
    schema: {
      properties: {
        success: {
          type: 'boolean',
        },
        data: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          
          },
        },
      },
    },
  };