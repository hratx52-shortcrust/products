const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'hello123',
  database: 'SDC'
});

client.connect();