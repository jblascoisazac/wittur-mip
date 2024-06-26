import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { VariantModule } from './variant/variant.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'sa',
      password: 'yourStrong(!)Password',
      database: 'test',
      entities: [Product],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        encrypt: false,
      },
    }),
    VariantModule,
  ],
})
export class AppModule {}
