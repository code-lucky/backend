import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty({
        message: 'Title is required'
    })
    title: string;

    name: string;

    content: string;
    
    type: number;
    
    cover_img: string;
}
