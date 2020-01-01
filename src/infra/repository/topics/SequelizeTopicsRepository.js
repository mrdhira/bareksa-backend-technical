const topicsMapper = require('./SequelizeTopicsMapper');

class SequelizeTopicsRepository {
  constructor({ sequelize, TopicsModel, TopicsNewsModel }) {
    this.sequelize = sequelize;
    this.TopicsModel = TopicsModel;
    this.TopicsNewsModel = TopicsNewsModel;
  }

  async findOrCreateByName(topics) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const [topic, created] = await this.TopicsModel.findOrCreate({
        where: { name: topics.name },
        defaults: { id: topics.id },
      });
      await sqlTrx.commit();
      return topicsMapper.toEntity(topic);
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }

  async mapTopicsNews(topicsId, newsId) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const topicsNews = await this.TopicsNewsModel.create({
        topics_id: topicsId,
        news_id: newsId,
      });
      await sqlTrx.commit();
      return topicsNews;
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }

}

module.exports = SequelizeTopicsRepository;
