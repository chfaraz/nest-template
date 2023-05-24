import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'First Name of user',
        required: true,
      })
      @IsString()
      firstName: string;
    
      @ApiProperty({
        description: 'Last Name of user',
        required: true,
      })
      @IsString()
      lastName: string;
}
