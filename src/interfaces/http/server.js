const express = require('express');

class Server {
  constructor({ config, logger, router }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    this.express.disable('x-powered-by');
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express
        .listen(this.config.port, () => {
          const { port } = http.address();
          this.logger.info(`Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
