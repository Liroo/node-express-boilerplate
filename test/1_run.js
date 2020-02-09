import request from 'supertest';

global.var.mock.user = {
  admin: {
    email: 'admin@test.com',
    password: '123456',
  },
  user_1: {
    email: 'user_1@test.com',
    password: '123456',
  },
  user_2: {
    email: 'user_2@test.com',
    password: '123456',
  },
  user_3: {
    email: 'user_3@test.com',
    password: '123456',
  },
};

describe('USER', function () {
  describe('POST /user', function () {
    it('should fail to create an user because of email', function (done) {
      request(global.var.app)
        .post('/api/user')
        .send({
          email: 'test@test',
          password: '123456'
        })
        .expect(400, done);
    });
    it('should fail to create an user because of password', function (done) {
      request(global.var.app)
        .post('/api/user')
        .send({
          email: 'test@test.com',
          password: '1234'
        })
        .expect(400, done);
    });

    it('should create a normal user 1', function (done) {
      request(global.var.app)
        .post('/api/user')
        .send(global.var.mock.user.user_1)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          global.var.tokenUser_1 = res.body.data[0].token;
          global.var.idUser_1 = res.body.data[0].user;

          done();
        });
    });

    it('should create a normal user 2', function (done) {
      request(global.var.app)
        .post('/api/user')
        .send(global.var.mock.user.user_2)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          global.var.tokenUser_2 = res.body.data[0].token;
          global.var.idUser_2 = res.body.data[0].user;

          done();
        });
    });

    it('should fail because of duplicate email', function (done) {
      request(global.var.app)
        .post('/api/user')
        .send(global.var.mock.user.user_2)
        .expect(409, done);
    });
  });

  describe('GET /user', function () {
    it('should get his own user (user 1)', function (done) {
      request(global.var.app)
        .get('/api/user')
        .set('Authorization', 'bearer ' + global.var.tokenUser_1)
        .expect(200, done);
    });

    it('should get his own user (user 2)', function (done) {
      request(global.var.app)
        .get('/api/user')
        .set('Authorization', 'bearer ' + global.var.tokenUser_2)
        .expect(200, done);
    });
  });

  describe('GET /user/:userId', function () {
    it('should get another user (user 1)', function (done) {
      request(global.var.app)
        .get(`/api/user/${global.var.idUser_1}`)
        .set('Authorization', 'bearer ' + global.var.tokenUser_1)
        .expect(200, done);
    });

    it('should fail to found user with fake id', function (done) {
      request(global.var.app)
        .get('/api/user/123')
        .set('Authorization', 'bearer ' + global.var.tokenUser_2)
        .expect(404, done);
    });
  });

  describe('PUT /user', function () {
    it('should update his own user (user 1)', function (done) {
      request(global.var.app)
        .put('/api/user')
        .set('Authorization', 'bearer ' + global.var.tokenUser_1)
        .send({
          profile: {
            firstName: 'Test',
          },
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          if (res.body.data[0].profile.firstName !== 'Test') {
            return done(new Error('User profile was not updated'));
          }
          done();
        });
    });
  });

  describe('PUT /user/:userId', function () {
    it('should not update another user 2 because lack of permission (user 1)', function (done) {
      request(global.var.app)
        .put(`/api/user/${global.var.idUser_2}`)
        .set('Authorization', 'bearer ' + global.var.tokenUser_1)
        .send({
          profile: {
            firstName: 'Test',
          }
        })
        .expect(403, done);
    });
  });

  describe('DELETE /user', function () {
    it('should create an user 3 in order to remove it', function (done) {
      request(global.var.app)
        .post('/api/user')
        .send(global.var.mock.user.user_3)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          global.var.tokenUser_3 = res.body.data[0].token;
          global.var.idUser_3 = res.body.data[0].user;

          done();
        });
    });
    it('should delete his own user (user 3)', function (done) {
      request(global.var.app)
        .delete('/api/user')
        .set('Authorization', 'bearer ' + global.var.tokenUser_3)
        .expect(200, done);
    });
  });

  describe('DELETE /user/:userId', function () {
    it('should re-create an user 3 in order to remove it (let\'s kill some guys again and again)', function (done) {
      request(global.var.app)
        .post('/api/user')
        .send(global.var.mock.user.user_3)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          global.var.tokenUser_3 = res.body.data[0].token;
          global.var.idUser_3 = res.body.data[0].user;

          done();
        });
    });
    it('should not delete the user 3 because lack of permission (pfiouu, finally that\'s fine) (user 2)', function (done) {
      request(global.var.app)
        .delete(`/api/user/${global.var.idUser_3}`)
        .set('Authorization', 'bearer ' + global.var.tokenUser_2)
        .expect(403, done);
    });
    it('should not delete a fake user id (admin)', function (done) {
      request(global.var.app)
        .delete('/api/user/123')
        .set('Authorization', 'bearer ' + global.var.tokenUser_1)
        .expect(404, done);
    });
  });
});