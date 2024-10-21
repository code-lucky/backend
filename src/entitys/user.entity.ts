import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity({
    name: 'user'
})
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '用户名称',
        name: 'user_name'
    })
    user_name: string;

    @Column({
        comment: '用户密码'
    })
    password: string;

    @Column({
        comment: '用户头像',
        nullable: true
    })
    head_pic: string;

    @Column({
        comment: '手机号码',
        length: 20,
        nullable: true
    })
    phone_number: string;

    @Column({
        comment: '邮箱',
        nullable: true
    })
    email: string;
    
    @Column({
        comment: '用户性别',
        default: 0
    })
    gender: number;

    @Column({
        comment: '用户状态',
        default: 0
    })
    status: number;

    @Column({
        comment: '用户逻辑删除0是正常状态，1是删除',
        default: 0
    })
    is_delete: number;

    @CreateDateColumn({
        name: 'create_time'
    })
    create_time: Date;

    @CreateDateColumn({
        name: 'update_time'
    })
    update_time: Date;

    @ManyToOne(() => Role, role => role.user)
    @JoinColumn({
        name: 'roleId'
    })
    role: Role;

    @Column({
        comment: '角色id',
        default: 1,
    })
    roleId: number;
}