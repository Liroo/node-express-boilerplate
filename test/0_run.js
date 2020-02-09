import request from 'supertest';

import mongoose from 'mongoose';

import App from 'api/application';

global.var = {
  mock: {}
};

global.var.app = App.express.app;

describe('HEALTH CHECK', function () {
  before(async () => {
    mongoose.connection.dropDatabase();

    await App.boot();
  });

  it('should run the server and pass the health check test', function (done) {
    request(global.var.app)
      .get('/api/')
      .expect(200, done);
  });
});