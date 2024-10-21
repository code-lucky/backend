import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @Column({ name: 'sort', comment: '排序', default: 0 })
    sort: number;

    @Column({ name: 'status', comment: '状态0是显示，1是不显示', default: 0 })
    status: number;

    @Column({ name: 'is_delete', comment: '逻辑删除0是正常状态，1是删除', default: 0 })
    is_delete: number;

    @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
    create_time: Date;

    @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
    update_time: Date;
}