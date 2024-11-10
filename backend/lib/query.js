const PgClient = require('pg').Client;
require('dotenv').config();
const env = process.env;

async function query (statement, ...args) {
  try {
    const connection = new PgClient({
      database: env.db_name,
      user: env.db_user,
      password: env.db_pass
    });
  
    await connection.connect()
    const result = await connection.query(statement, args);
    await connection.end();
    
    return result;
  } catch (error) {
    console.log('Database query error');
    console.log(error);
  }
}

module.exports = query;