import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'sa',
      password: 'yourStrong(!)Password',
      database: 'test',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        encrypt: false,
      },
    }),
    ProductModule,
  ],
})
export class AppModule {}
