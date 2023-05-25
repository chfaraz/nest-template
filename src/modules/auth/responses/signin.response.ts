
export const SigninResponse = {
  schema: {
    properties: {
      success: {
        type: 'boolean',
      },
      data: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
          },
          token: {
            type: 'string',
          },
        },
      },
    },
  },
};
