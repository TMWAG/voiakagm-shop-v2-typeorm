import { DataSource } from 'typeorm';
import CONNECTION from './db.config';

const AppDataSource = new DataSource({
  ...CONNECTION,
  entities: ['src/modules/**/entities/*.db.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: Boolean(process.env.DB_SYNC),
});

AppDataSource.initialize()
  .then(() => {
    console.log('data source has been initialized');
  })
  .catch((e) => {
    console.error('Error during Data Source initialization', e);
  });

export default AppDataSource;
