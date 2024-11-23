const PgClient = require('pg').Client;
require('dotenv').config();
const env = process.env;

async function query (statement, ...args) {
  try {
    const connection = new PgClient({
      connectionString: env.db_address
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