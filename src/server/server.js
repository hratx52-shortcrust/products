const express = require('express');
const app = require('./app');

const port = 3142;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
