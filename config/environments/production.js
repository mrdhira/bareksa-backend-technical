
module.exports = {
  version: process.env.API_VERSION,
  port: process.env.NODE_PORT,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
};
