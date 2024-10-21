import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '../../entitys/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private articleRepository: Repository<Article>;


  async list(page: number, pageSize: number) {
    try {
      const list = await this.articleRepository.find({
        order: {
          create_time: 'DESC'
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      });
      return {
        list,
        total: await this.articleRepository.count()
      }
    } catch (e) {
      throw new HttpException('Get Article List Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Create Article
   * @param createArticleDto 
   * @returns 
   */
  async create(createArticleDto: CreateArticleDto) {
    try {
      const article = new Article();
      article.title = createArticleDto.title;
      article.content = createArticleDto.content;
      article.name = createArticleDto.name;
      await this.articleRepository.save(article);
      return 'Create Success';
    } catch (e) {
      throw new HttpException('Create Article Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update Article
   * @param updateArticleDto 
   * @returns 
   */
  async update(updateArticleDto: UpdateArticleDto) {
    try {
      const data = await this.articleRepository.findOne({ where: { id: updateArticleDto.id } });
      if (!data) {
        throw new HttpException('Article Not Found', HttpStatus.BAD_REQUEST);
      }

      data.title = updateArticleDto.title;
      data.content = updateArticleDto.content;
      data.name = updateArticleDto.name;

      await this.articleRepository.save(data);
      return 'Update Success';
    } catch (e) {
      throw new HttpException('Update Article Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Delete Article
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    try {
      const data = await this.articleRepository.findOne({ where: { id } });
      if (!data) {
        throw new HttpException('Article Not Found', HttpStatus.BAD_REQUEST);
      }

      await this.articleRepository.delete({ id });
      return 'Delete Success';
    }catch(e) {
      throw new HttpException('Delete Article Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get Article Detail
   * @param id 
   * @returns 
   */
  async getDetail(id: number) {
    try {
      const data = await this.articleRepository.findOne({ where: { id } });
      if (!data) {
        throw new HttpException('Article Not Found', HttpStatus.BAD_REQUEST);
      }
      return data;
    } catch (e) {
      throw new HttpException('Get Article Detail Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
