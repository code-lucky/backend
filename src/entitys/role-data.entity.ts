import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Menu } from "./menu.entity";

@Entity({
    name: 'role_data'
})
export class RoleData{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
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

    @ManyToOne(() => Role, role => role.roleData)
    role: Role;

    @ManyToOne(() => Menu, menu => menu.roleData)
    menu: Menu;

    @Column({
        comment: '角色ID'
    })
    roleId: number;

    @Column({
        comment: '菜单ID'
    })
    menuId: number; 
}