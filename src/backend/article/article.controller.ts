import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { RequireLogin } from 'src/decorator/custom.decorator';

@RequireLogin()
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Get('list')
  async list(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    return await this.articleService.list(page, pageSize);
  }

  @Post('create')
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Post('update')
  async update(@Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.update(updateArticleDto);
  }

  @Post('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.articleService.remove(+id);
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.getDetail(+id);
  }
}
