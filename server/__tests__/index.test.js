const app = require('../src');
const server = require('superTest')(app);

describe('/api/v1/phone-numbers', () => {
  it('returns a status of 405 for non-POST requests', done => {
    server.get('/api/v1/phone-numbers').end((err, res) => {
      expect(err).toBe(null);
      expect(res.status).toBe(405);
      done();
    });
  });
  it('allows POST requests', done => {
    server
      .post('/api/v1/phone-numbers')
      .send({ total: 5 })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Successfully created');
        expect(res.body.id).toBeDefined();
        done();
      });
  });
  it('returns an 400 error if total is not an integer', done => {
    server
      .post('/api/v1/phone-numbers')
      .send({ total: 'bad data' })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(400);
        expect(res.body.error.message).toBe('Total must be an integer');
        expect(res.body.id).not.toBeDefined();
        done();
      });
  });
});

describe('/api/v1/phone-numbers/:id', () => {
  it('returns a status of 405 for non-GET requests', done => {
    server
      .post('/api/v1/phone-numbers/124245556')
      .send({ total: 5 })
      .end((err, res) => {
        expect(res.status).toBe(405);
        done();
      });
  });
  it('returns a 404 if file is missing', done => {
    server.get('/api/v1/phone-numbers/123456789').end((err, res) => {
      expect(err).toBe(null);
      expect(res.status).toBe(404);
      expect(res.body.error.message).toBeDefined();
      done();
    });
  });
  it('returns an 400 error if id is not an integer', done => {
    server
      .get('/api/v1/phone-numbers/badd-data')
      .send({ total: 'bad data' })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(400);
        expect(res.body.error.message).toBe('Id must be an integer');
        expect(res.body.id).not.toBeDefined();
        done();
      });
  });
});
