import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleData } from "./role-data.entity";
import { User } from "./user.entity";

@Entity({
    name: 'role'
})
export class Role{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '角色名称',
        name: 'role_name'
    })
    role_name: string;

    @Column({
        name: 'is_delete',
        comment: '逻辑删除0是正常状态，1是删除',
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

    @OneToMany(() => RoleData, roleData => roleData.role)
    roleData: RoleData[];

    @OneToMany(() => User, user => user.role)
    user: User;
}