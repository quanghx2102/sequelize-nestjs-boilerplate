import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsString({ message: 'Please enter a valid username' })
  @IsNotEmpty({ message: 'Please enter a username' })
  username: string;

  @IsString({ message: 'Please enter a valid password' })
  @IsNotEmpty({ message: 'Please enter a password' })
  password: string;
}
