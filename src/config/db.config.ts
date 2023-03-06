import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const CONNECTION: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB,
};

export default CONNECTION;
