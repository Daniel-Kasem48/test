import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';


export class GeolocationSearchInput {
  @ApiProperty({ description: 'The address to search for', example: 'Damstraat 43' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ description: 'The email address of the user', example: 'user@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email?: string;
}
