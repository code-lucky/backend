import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity({
    name: 'system_log'
})
export class SystemLog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: 'Api地址'
    })
    api_address: string;

    @Column({
        comment: '请求方式'
    })
    request_method: string;

    @Column({
        comment: '请求参数',
        type: 'longtext',
        nullable: true
    })
    request_param: string;

    @Column({
        comment: '请求IP'
    })
    request_ip: string;

    @Column({
        comment: '响应参数',
        type: 'longtext',
        nullable: true
    })
    response_param: string;

    @CreateDateColumn({
        comment: '创建时间',
        name: 'create_time'
    })
    create_time: Date;
}
