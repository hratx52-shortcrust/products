const request = require('supertest');
const app = require('./app.js');

it('should respond to GET "/"', () => {
  return request(app)
    .get('/')
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
});

it('should respond to GET "/products"', () => {
  return request(app)
    .get('/products')
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
});

it('should respond to GET "/products/:product_id"', () => {
  return request(app)
    .get('/products/1')
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
});

it('should respond to GET "/products/:product_id/styles"', () => {
  jest.setTimeout(15000); // getStyles is very slow right now, taking up to 12 seconds to return a value
  return request(app)
    .get('/products/1/styles')
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
});

it('should respond to GET "/products/:product_id/related"', () => {
  return request(app)
    .get('/products/1/related')
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
});