import { BaseEntity } from "src/base-entity/BaseEntity";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('navigation')
export class Navigation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '导航名称',
    })
    name: string;

    @Column({
        comment: '导航路径',
    })
    path: string;

    @Column({
        comment: '导航父ID',
        default: 0
    })
    pid: number;

    @Column({
        comment: '导航图标',
        nullable: true
    })
    icon: string;
}