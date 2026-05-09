import {IsEmail, IsString, Min, min, MinLength} from 'class-validator';

export class RegisterDTO{
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}