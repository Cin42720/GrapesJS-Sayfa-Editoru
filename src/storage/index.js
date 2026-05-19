import { createFileStore } from './fileStore.js';
import { createMysqlStore } from './mysqlStore.js';

export function createStore(env = process.env) {
  const driver = (env.STORAGE_DRIVER || 'file').toLowerCase();

  if (driver === 'mysql') {
    return createMysqlStore({
      host: env.MYSQL_HOST || '127.0.0.1',
      port: Number(env.MYSQL_PORT || 3306),
      database: env.MYSQL_DATABASE,
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD
    });
  }

  return createFileStore({
    directory: env.FILE_STORAGE_DIR || 'storage/pages'
  });
}
