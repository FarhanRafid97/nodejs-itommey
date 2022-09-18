/* eslint-disable */
const request = require('supertest');

const { app } = require('../index');

describe('/api/v1/product', () => {
  it('status: 400 and msg "Name cant be empty" when request body empty', async () => {
    const response = await request(app)
      .post('/api/v1/product')
      .send({ name: '', qty: '', expiredAt: '' })
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toEqual('Name cant be empty');
  });
  it('status: 200 and msg and return all value', async () => {
    const response = await request(app)
      .post('/api/v1/product')
      .send({ name: 'Beng Beng', qty: 10, expiredAt: '2022-11-17T04:33:12.000Z' })
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toEqual('Beng Beng');
  });

  it('status: 200 and msg and return data product ', async () => {
    const response = await request(app)
      .post('/api/v1/product')
      .send({ name: 'Beng Beng', qty: 10, expiredAt: '2022-11-17T04:33:12.000Z' })
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toEqual('Beng Beng');
  });

  it('status: 200 and return detail product', async () => {
    const response = await request(app).get('/api/v1/product/1');

    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toEqual('Beng Beng');
  });

  it('status: 400 and dont return detail product', async () => {
    const response = await request(app).get('/api/v1/product/4');
    console.log(response.status);
    expect(response.status).toEqual(404);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toEqual('We dont have product with Id:4');
  });

  it('status: 200 and return updated product', async () => {
    const response = await request(app)
      .put('/api/v1/product/1')
      .send({ name: 'Beng Beng updated' })
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toEqual('Beng Beng updated');
  });

  it('status: 200 and return updated product', async () => {
    const response = await request(app)
      .put('/api/v1/product/4')
      .send({ name: 'Beng Beng updated' })
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toEqual('We dont have product with Id:4');
  });

  it('status: 400 and dont return detail product', async () => {
    const response = await request(app).get('/api/v1/product/aaa');
    console.log(response.status);
    expect(response.status).toEqual(400);

    expect(response.body).toHaveProperty('msg');
    expect(response.body.msg).toEqual('ID must be a number');
  });
});
