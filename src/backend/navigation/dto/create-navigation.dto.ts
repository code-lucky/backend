import { IsNotEmpty } from "class-validator";

export class CreateNavigationDto {
    @IsNotEmpty({
        message: 'Name cannot be empty'
    })
    name: string;

    @IsNotEmpty({
        message: 'Path cannot be empty'
    })
    path: string;

    icon: string;

    pid: number;
}
