import { BaseEntity } from "src/base-entity/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('article')
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '文章标题',
    })
    title: string;

    @Column({
        comment: '文章名称',
        nullable: true
    })
    name: string;

    @Column({
        comment: '文章内容',
        type: 'longtext'
    })
    content: string;

    @Column({
        comment: '文章分类',
        default: 0
    })
    type: number;

    @Column({
        comment: '封面图片',
        nullable: true
    })
    cover_img: string;
}
