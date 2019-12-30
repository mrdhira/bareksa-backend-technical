const { Router } = require('express');
const { inject } = require('awilix-express');
const statusMonitor = require('express-status-monitor')
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression')
const controller = require('./utils/createControllers');

module.exports = ({ config, containerMiddleware, httpLogger, errorHandler }) => {
  const router = Router();

  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  if (config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/', inject('logger'));

  /*
  * Add your API routes here
  *
  * You can use the `controllers` helper like this:
  * apiRouter.use('/users', controller(controllerPath))
  *
  * The `controllerPath` is relative to the `interfaces/http` folder
  */

  apiRouter.get('/', (req, res) => {
    res.json({ name: 'Bareksa Backend Technical', version: config.version });
  });

  apiRouter.use('/topics', controller('topics/TopicsController'));
  apiRouter.use('/news', controller('news/NewsController'));
  apiRouter.use('/tags', controller('tags/TagsController'));
  
  router.use('/', apiRouter);
  router.use(errorHandler);

  return router;
};