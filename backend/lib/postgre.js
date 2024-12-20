const query = require('./query');
const bcrypt = require('bcrypt');

async function generatePassword(password) {
  return await bcrypt.hash(password, 2);
}

const methods = {
  async register(username, email, password) {
    if (await this.usernameExists(username) && await this.emailExists(email)) {
      return { msg: 'Username and email already exists' }
    } else if (await this.usernameExists(username)) {
      return { msg: 'Username already exists' }
    } else if (await this.emailExists(email)) {
      return { msg: 'Email already exists' }
    }

    const hashedPassword = await generatePassword(password);

    const result = await query('INSERT INTO users (username, email, password, active) VALUES ($1, $2, $3, $4)', username, email, hashedPassword, true);

    if (result && result.rowCount > 0) {
      return { success: true, msg: 'Account was registered' }
    } else {
      return { msg: 'Account was unable to be registered' }
    }
  },

  async login(username, password) {
    const result = await query('SELECT * FROM users WHERE username = $1', username);

    if (result && result.rowCount > 0) {
      const userInfo = result.rows[0];
      if (await bcrypt.compare(password, userInfo.password)) {
        return { success: true, msg: 'Logged in', username: userInfo.username, description: userInfo.description, id: userInfo.id }
      } else {
        return { msg: 'Password incorrect' }
      }
    } else {
      return { msg: 'Username not found' }
    }
  },

  async updateBasic(username, description, userId) {
    if (await this.usernameExists(username, userId)) {
      return { msg: 'Username already exists' }
    }

    const result = await query('UPDATE users SET username = $1, description = $2 WHERE id = $3', username, description, userId);

    if (result && result.rowCount > 0) {
      const userInfo = await this.getUserById(userId);
      return { success: true, msg: 'Changes to basic saved', username: userInfo.username, description: userInfo.description, id: userInfo.id }
    } else {
      return { msg: 'Could not save changes' }
    }
  },

  async updatePassword(oldPassword, password, userId) {
    const userInfo = await this.getUserById(userId);

    if (await bcrypt.compare(oldPassword, userInfo.password)) {
      const hashedPassword = await generatePassword(password);
      const result = await query('UPDATE users SET password = $1 WHERE id = $2', hashedPassword, userId);

      if (result && result.rowCount > 0) {
        return { success: true, msg: 'Password has been changed' }
      } else {
        return { msg: 'Password could not be changed' }
      }
    } else {
      return { msg: 'Previous password not correct' }
    }
  },

  async toggleVisibility(userId) {
    const result = await query('UPDATE users SET visible = NOT visible WHERE id = $1', userId);

    if (result && result.rowCount > 0) {
      const userInfo = await this.getUserById(userId);

      if (userInfo.visible) {
        return { success: true, msg: 'Profile set to visible' }
      } else {
        return { success: true, msg: 'Profile set to invisible' }
      }
    } else {
      return { msg: 'Could not toggle visibility' }
    }
  },

  async removeUser(username, password, userId) {
    const userInfo = await this.getUserById(userId);

    if (await bcrypt.compare(password, userInfo.password)) {
      const result = await query('DELETE FROM users WHERE username = $1 AND id = $2', username, userId);

      if (result && result.rowCount > 0) {
        return { success: true, msg: 'User has been removed' }
      } else {
        return { msg: 'Username not correct' }
      }
    } else {
      return { msg: 'Password not correct' }
    }
  },

  async user(userId) {
    const result = await query('SELECT * FROM users WHERE id = $1 AND visible = true', userId);

    if (result && result.rowCount > 0) {
      const user = result.rows[0];
      const userInfo = { username: user.username, description: user.description };
      if (user.visible) {
        return { success: true, userInfo }
      } else {
        return { msg: 'User is not visible' }
      }
    } else {
      return { msg: 'User not found by id' }
    }
  },

  async getUsers(page) {
    const offset = (page - 1) * 4;
    const result = await query('SELECT * FROM users WHERE visible = true ORDER BY time_joined DESC LIMIT 4 OFFSET $1', offset);

    const users = [];

    if (result && result.rowCount > 0) {
      const rowCount = (await query('SELECT * FROM users WHERE visible = true')).rowCount / 4;
      for (let index = 0; index < result.rowCount; index++) {
        const user = result.rows[index];
        users.push({ username: user.username, id: user.id, timeJoined: user.time_joined });
      }
      return { success: true, users, max: rowCount }
    } else {
      return { msg: 'Could not get users' }
    }
  },

  async getUserById(userId) {
    const result = await query('SELECT * FROM users WHERE id = $1', userId);

    return result.rows[0];
  },

  async usernameExists(username, userId) {
    let result;
    if (userId) {
      result = await query(`SELECT * FROM users WHERE username = $1 AND id != $2`, username, userId);
    } else {
      result = await query('SELECT * FROM users WHERE username = $1', username);
    }


    if (result && result.rowCount > 0) {
      return true;
    }
  },

  async emailExists(email, userId) {
    let result;
    if (userId) {
      result = await query(`SELECT * FROM users WHERE email = $1 AND id != $2`, email, userId);
    } else {
      result = await query('SELECT * FROM users WHERE email = $1', email);
    }

    if (result && result.rowCount > 0) {
      return true;
    }
  }
}

module.exports = methods;