import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'sa',
      password: 'yourStrong(!)Password',
      database: 'WitturMip',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        encrypt: false,
      },
    }),
    ProductModule,
    HealthcheckModule,
  ],
})
export class AppModule {}
