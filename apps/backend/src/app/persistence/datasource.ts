import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ENTITIES } from './entities';
import { MIGRATIONS } from './migrations';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

config();

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DATABASE_SSL === 'true' ? true : null,
  entities: ENTITIES,
  migrations: MIGRATIONS,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  synchronize: false,
};

export default new DataSource(DATA_SOURCE_OPTIONS);

export function getConfig() {
  return DATA_SOURCE_OPTIONS as MysqlConnectionOptions;
}
