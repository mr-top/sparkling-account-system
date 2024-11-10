const query = require('./query');
const bcrypt = require('bcrypt');

async function generatePassword (password) {
  return await bcrypt.hash(password, 2);
}

const methods = {
  async register (username, email, password) {
    if (await this.usernameExists(username) && await this.emailExists(email)) {
      return {msg: 'Username and email already exists'}
    } else if (await this.usernameExists(username)) {
      return {msg: 'Username already exists'}
    } else if (await this.emailExists(email)) {
      return {msg: 'Email already exists'}
    }

    const hashedPassword = await generatePassword(password);

    const result = await query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', username, email, hashedPassword);

    if (result && result.rowCount > 0) {
      return {success: true, msg: 'Account was registered'}
    } else {
      return {msg: 'Account was unable to be registered'}
    }
  },

  async login (username, password) {
    const result = await query('SELECT * FROM users WHERE username = $1', username);

    if (result && result.rowCount > 0) {
      const userInfo = result.rows[0];
      if (await bcrypt.compare(password, userInfo.password)) {
        return {success: true, msg: 'Logged in', username: userInfo.username, description: userInfo.description, id: userInfo.id}
      } else {
        return {msg: 'Password incorrect'}
      }
    } else {
      return {msg: 'Username not found'}
    }
  },

  async usernameExists (username, userId) {
    const result = await query(`SELECT * FROM users WHERE username = $1 ${userId ? 'AND id != $2' : ''}`, username, userId);

    if (result && result.rowCount > 0) {
      return true;
    }
  },

  async emailExists (email, userId) {
    const result = await query(`SELECT * FROM users WHERE email = $1 ${userId ? 'AND id != $2' : ''}`, email, userId);

    if (result && result.rowCount > 0) {
      return true;
    }
  }
}

module.exports = methods;