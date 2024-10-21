import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import { Navigation } from '../../entitys/navigation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NavigationService {

    @InjectRepository(Navigation)
    private navigationRepository: Repository<Navigation>;

    /**
     * 
     * @param createNavigationDto 创建导航的dto
     * @returns 
     */
    async getList() {
        try{
            const list = await this.navigationRepository.find({select: ['id', 'name', 'path', 'icon', 'create_time']});
            return list;
        }catch(e){
            throw new HttpException('获取导航列表失败', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * 
     * @param createNavigationDto 创建导航的dto
     * @returns 
     */
    async createNavigation(createNavigationDto: CreateNavigationDto) {
        const navigation = new Navigation();
        navigation.name = createNavigationDto.name;
        navigation.path = createNavigationDto.path;
        navigation.pid = createNavigationDto.pid;
        navigation.icon = createNavigationDto.icon;
        await this.navigationRepository.save(navigation);
        return navigation;
    }


    /**
     * 
     * @param updateNavigationDto 更新导航的dto
     * @returns 
     */
    async updateNavigation(updateNavigationDto: UpdateNavigationDto) {
        const navigation = await this.navigationRepository.findOne({ where: { id: updateNavigationDto.id } });
        if (!navigation) {
            throw new HttpException('Navigation Not Found', HttpStatus.BAD_REQUEST);
        }
        navigation.name = updateNavigationDto.name;
        navigation.path = updateNavigationDto.path;
        navigation.icon = updateNavigationDto.icon;
        await this.navigationRepository.save(navigation);
        return navigation;
    }

    /**
     * 
     * @param id 导航id
     * @returns 
     */
    async delNavigation(id: number) {
        const navigation = await this.navigationRepository.findOne({ where: { id } });
        if (!navigation) {
            throw new HttpException('Navigation Not Found', HttpStatus.BAD_REQUEST);
        }
        await this.navigationRepository.remove(navigation);
        return navigation;
    }

    /**
     * 
     * @param id 导航id
     * @returns 
     */
    async getNavigationById(id: number) {
        const navigation = await this.navigationRepository.findOne({ where: { id } });
        if (!navigation) {
            throw new HttpException('Navigation Not Found', HttpStatus.BAD_REQUEST);
        }
        return navigation;
    }
}
