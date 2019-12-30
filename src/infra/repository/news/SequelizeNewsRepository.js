const newsMapper = require('./SequelizeNewsMapper');

class SequelizeNewsRepository {
  constructor({ NewsModel, TagsModel, TopicsModel }) {
    this.NewsModel = NewsModel;
    this.TagsModel = TagsModel;
    this.TopicsModel = TopicsModel;
  }

  getAll() {

  }

  getById() {

  }

  getByStatus() {

  }

  getByTopics() {
    
  }
}

module.exports = SequelizeNewsRepository;
