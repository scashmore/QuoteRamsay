import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.150.201.160',
      port: 5432,
      username: 'ramsay-quotes',
      password: 'ramsay',
      database: 'postgres',
      logging: true,
      entities: [QuotesModule],
      synchronize: false,
      extra: {
        options: {
          encrypt: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
