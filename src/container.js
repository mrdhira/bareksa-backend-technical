const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

// System
const Application = require('./app/Application');
const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const logger = require('./infra/logging/logger');
const config = require('../config');

// Domain
const NewsDomain = require('./domain/news/News');
const NewsStatusDomain = require('./domain/news/NewsStatus');
const TagsDomain = require('./domain/tags/Tags');
const TopicsDomain = require('./domain/topics/Topics');

// Database Models
const {
  sequelize,
  News: NewsModel,
  Tags: TagsModel,
  Topics: TopicsModel,
  TopicsNews: TopicsNewsModel,
  NewsTags: NewsTagsModel,
} = require('./infra/database/models');

// Repository
const SequelizeTopicsRepository = require('./infra/repository/topics/SequelizeTopicsRepository');
const SequelizeNewsRepository = require('./infra/repository/news/SequelizeNewsRepository');
const SequelizeTagsRepository = require('./infra/repository/tags/SequelizeTagsRepository');

// App
// News
const {
  GetNews,
  CreateNews,
  UpdateNews,
  DeleteNews,
} = require('./app/news');
// Tags
const {
  GetTags,
  CreateTags,
  UpdateTags,
  DeleteTags,
} = require('./app/tags');

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
    containerMiddleware: asValue(scopePerRequest(container)),
  });

// Domain
container
  .register({
    NewsDomain: asClass(NewsDomain),
    NewsStatusDomain: asValue(NewsStatusDomain),
    TagsDomain: asClass(TagsDomain),
    TopicsDomain: asClass(TopicsDomain),
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

// App
// News
container
  .register({
    getNews: asClass(GetNews),
    createNews: asClass(CreateNews),
    updateNews: asClass(UpdateNews),
    deleteNews: asClass(DeleteNews),
  });
// Tags
container
  .register({
    getTags: asClass(GetTags),
    createTags: asClass(CreateTags),
    updateTags: asClass(UpdateTags),
    deleteTags: asClass(DeleteTags),
  });

module.exports = container;
