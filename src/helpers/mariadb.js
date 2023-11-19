import mariadb from "mariadb";

/**
 * Function to connect to MariaDB
 * @param {*} query SQL command in string
 * @returns json
 */

export default function mySqlQuery(query,params=[]){
  return new Promise(async function (resolve, reject) {
    let connection;
    try {
      connection = await mariadb.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMANM,
        host: process.env.DB_HOSTIPID,
        port: process.env.PORT_DB,
        connectTimeout:5000,
      });
      const result = await connection.query(query,params);
      resolve(result);
    } catch (err) {
      // catches errors in getConnection and the query
      reject(err);
    } finally {
      if (connection) {
        // the connection assignment worked, must release
        try {
          await connection.destroy();
        } catch (e) {
          console.error(e);
        }
      }
    }
  });
};