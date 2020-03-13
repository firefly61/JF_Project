'use strict';

const Service = require('egg').Service;

class MyService extends Service {
  async connect() {
    const connection = await this.app.oracle.getConnection();
    const result = await connection.execute('');
    connection.close();
    console.log(result.rows[0].date);
  }
}

module.exports = MyService;
