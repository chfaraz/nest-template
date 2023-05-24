import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SigninDto {
    @ApiProperty({
        description: 'User Name of user',
        required: true,
      })
      @IsString()
      userName: string;
    
      @ApiProperty({
        description: 'password of user',
        required: true,
      })
      @IsString()
      password: string;
}
