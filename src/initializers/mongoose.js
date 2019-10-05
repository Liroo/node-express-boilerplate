import mongoose from 'mongoose';

import Logs from 'modules/logs';

export default class Mongoose {
  constructor(addr, db) {
    this.mongooseConnection = null;
    this.error = null;

    this.addr = addr;
    this.db = db;
  }

  async createConnection() {
    mongoose.set('useCreateIndex', true);
    try {
      Logs.log('Mongoose', `Trying to connect to ${this.addr}/${this.db}...`);

      this.mongooseConnection = await mongoose.connect(`${this.addr}/${this.db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      Logs.success('Mongoose', `Successfuly connected to ${this.addr}/${this.db}`);
    } catch (err) {
      Logs.error('Mongoose', `Error when trying to connect to ${this.addr}/${this.db}`);
      throw err;
    }
  }
}
