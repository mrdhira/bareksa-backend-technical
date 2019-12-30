const topicsMapper = require('./SequelizeTopicsMapper');

class SequelizeTopicsRepository {
  constructor({ TopicsModel, NewsModel }) {
    this.TopicsModel = TopicsModel;
    this.NewsModel = NewsModel;
  }

  getAll() {

  }

  getById() {

  }

  findOrCreateByName(name) {

  }

}

module.exports = SequelizeTopicsRepository;
