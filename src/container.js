const { createContainer, asClass, asFunction, asValue } = require('awilix');

// System
const Application = require('./app/Application');
const Server = require('./interfaces/http/server');
const router = require('./interfaces/http/router');
const logger = require('./infra/logging/logger');
const config = require('../config');

// Middlewares
const httpLogger = require('./interfaces/http/middlewares/httpLogger')
const errorHandler = require('./interfaces/http/middlewares/errorHandlers');

// Database Models
const {
  sequelize,
  News: NewsModel,
  Tags: TagsModel,
  Topics: TopicsModel,
  TopiscNews: TopicsNewsModel,
  NewsTags: NewsTagsModel,
} = require('./infra/database/models');

// Repository
const SequelizeTopicsRepository = require('./infra/repository/topics/SequelizeTopicsRepository');
const SequelizeNewsRepository = require('./infra/repository/news/SequelizeNewsRepository');
const SequelizeTagsRepository = require('./infra/repository/tags/SequelizeTagsRepository');

// Initialize Container
const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
  })
  .register({
    config: asValue(config),
  });

// Middlewares
container
  .register({
    httpLogger: asFunction(httpLogger).singleton(),
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(errorHandler),
  });

// Database Models
container
  .register({
    sequelize: asValue(sequelize),
    NewsModel: asValue(NewsModel),
    TagsModel: asValue(TagsModel),
    TopicsModel: asValue(TopicsModel),
    TopicsNewsModel: asValue(TopicsNewsModel),
    NewsTagsModel: asValue(NewsTagsModel),
  });

// Repository
container
  .register({
    topicsRepository: asClass(SequelizeTopicsRepository).singleton(),
    newsRepository: asClass(SequelizeNewsRepository).singleton(),
    tagsRepository: asClass(SequelizeTagsRepository).singleton(),
  });

module.exports = container;
