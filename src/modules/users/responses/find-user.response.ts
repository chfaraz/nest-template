import { getSchemaPath } from "@nestjs/swagger";
import { FindUserResponseDto } from "../dto/find-user.response.dto";

export const FindUserResponse = {
    schema: {
      properties: {
        success: {
          type: 'boolean',
        },
        data: {
          type: 'object',
          properties: {
            count: {
              type: 'number',
            },
            rows: {
              type: 'array',
              items: {
                $ref: getSchemaPath(FindUserResponseDto),
              }
            },
          },
        },
      },
    },
  };