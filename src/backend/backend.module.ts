import { Module } from '@nestjs/common';
import { BackendController } from './backend.controller';
import { BackendService } from './backend.service';
import { RedisModule } from 'src/redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { WinstonModule } from 'src/winston/winston.module';
import { format, transports } from 'winston';
import * as chalk from 'chalk';
import { Constant } from 'src/utils/constant';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoginGuard } from 'src/guard/login.guard';
import { FileModule } from 'src/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { SystemLogModule } from 'src/backend/system-log/system-log.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 图片文件夹的路径
      serveRoot: '/api/images', // 将静态文件服务到 /images 路径
    }),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            })
          ),

        }),
        new transports.File({
          format: format.combine(
            format.timestamp(),
            format.json()
          ),
          filename: `loggger-${Constant.CURRENT_DATE}-${Constant.TIMESTAMP}.log`,
          dirname: `log/${Constant.CURRENT_DATE}`,
          maxsize: 1024 * 1024
        })
      ]
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m' // 默认30分钟
          }
        };
      },
      inject: [ConfigService],
      imports: undefined
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: 'src/.env'
      envFilePath: 'src/.env.local'
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: "mysql",
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: false,
          logging: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          // entities: [Pricing],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
      imports: undefined
    }),
    RedisModule,
    EmailModule,
    FileModule,
    BackendModule,
    SystemLogModule,
    UserModule
  ],
  controllers: [BackendController],
  providers: [
    BackendService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class BackendModule { }
