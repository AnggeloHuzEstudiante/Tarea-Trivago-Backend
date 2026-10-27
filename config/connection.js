import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
  user: 'root',
  database: 'trivago',
  port: 3306,
   password: '',
    /*host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,*/
});

export const connection = async () => {
    pool.getConnection(function (err, connection) {
  if (err instanceof Error) {
    console.log(err);
    return;
  }

  // ... some query
  console.log("Conectado a la base de datos")

  connection.release();

  // Close the pool
  pool.end();
});
}