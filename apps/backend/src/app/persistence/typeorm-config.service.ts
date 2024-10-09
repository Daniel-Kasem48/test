import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { BaseEntity, DatabaseType } from 'typeorm';

export interface DatabaseConfig {
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  entities?: BaseEntity[];
  schema?: string;
  type?: DatabaseType;
  autoSave?: boolean;
  logging?: boolean;
  synchronize?: boolean;
}

const Entities = [];

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor
  (
    private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, database, username, password } =
      this.configService.get<DatabaseConfig>('database');

    return {
      type: 'mysql', // Changed to 'mysql' to use the MySQL driver
      host: host?.split(':')[0],
      port: port,
      database: database,
      username: username,
      password: password,
      entities: Entities,
      autoLoadEntities: true,
      migrationsTableName: 'typeorm_migrations',
      // Uncomment if needed
      // logger: 'file',
      // logging: true,
      // synchronize: true,
    };
  }
}
