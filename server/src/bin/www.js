const http = require('http');
const app = require('../index');

const PORT = Number(process.env.PORT) || 3000;

http
  .createServer(app)
  .listen(PORT, () => console.log(`Listening on port: ${PORT}`));
