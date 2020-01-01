class Application {
  constructor({ server, sequelize, logger }) {
    this.server = server;
    this.sequelize = sequelize;
    this.logger = logger;

    if (sequelize && sequelize.options.logging) {
      sequelize.options.logging = logger.info.bind(logger);
    }
  }

  async start() {
    if (this.sequelize) {
      await this.sequelize.authenticate();
    }

    await this.server.start();
  }
}

module.exports = Application;
