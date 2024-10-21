import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleData } from "./role-data.entity";

@Entity({
    name: 'menu'
})
export class Menu{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '菜单名称',
    })
    menu_name: string;

    @Column({
        comment: '菜单父ID',
        default: 0
    })
    pid: number;

    @Column({
        comment: '菜单路径',
    })
    menu_path: string;

    @Column({
        comment: '菜单组件，指向的文件名称',
        nullable: true
    })
    menu_component: string;

    @Column({
        comment: '菜单图标',
        nullable: true
    })
    menu_icon: string;
    
    @Column({
        comment: '菜单排序',
        default: 0
    })
    sort: number;

    @Column({
        comment: '菜单是否隐藏，0是显示，1是隐藏',
        default: 0
    })
    hide: number;

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

    @OneToMany(() => RoleData, roleData => roleData.menu)
    roleData: RoleData[];
  children: any[];
}