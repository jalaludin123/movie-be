import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const TypeOrmMysql: MysqlConnectionOptions = {
  type: "mysql",
  username: 'root',
  database: 'movies-db',
  host: 'localhost',
  port: 3306,
  password: '',
  entities: ['dist/**/entities/*.entity.js'],
  synchronize: true,
}

export default TypeOrmMysql;