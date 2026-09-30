import { IsString,Length } from 'class-validator';

export class createuserdto {
    @IsString()
    @Length(3,100)
    name: string;
    age: number;

    @IsString()
    email: string;
}
