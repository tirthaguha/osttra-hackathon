
import { createPool, Pool } from "mysql";
let pool: Pool;

export type connectionParams = {
  host: string,
  user: string,
  password: string,
  database: string,
  port: number,
  connectionLimit: number
}
export const init = ({ host, user, password, database, port = 3306, connectionLimit = 2 }: connectionParams) => {
  try {
    pool = createPool({
      host,
      user,
      password,
      database,
      port,
      connectionLimit
    });
    console.debug('MySql Adapter Pool generated successfully');
    return pool
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};


export const setPool = (cPool: Pool) => {
  pool = cPool;
}

export const execute = <T>(query: string, params: string[] | unknown): Promise<T> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}
