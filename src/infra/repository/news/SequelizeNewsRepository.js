const newsMapper = require('./SequelizeNewsMapper');

class SequelizeNewsRepository {
  constructor({ sequelize, NewsModel, NewsTagsModel, TagsModel, TopicsModel, NewsStatusDomain }) {
    this.sequelize = sequelize;
    this.NewsModel = NewsModel;
    this.NewsTagsModel = NewsTagsModel;
    this.TagsModel = TagsModel;
    this.TopicsModel = TopicsModel;
    this.NewsStatus = NewsStatusDomain
  }

  async getAll() {
    try {
      const news = await this.NewsModel.findAll({
        include: [
          {
            attributes: ['id', 'name'],
            model: this.TopicsModel,
          },
          {
            attributes: ['id', 'name'],
            model: this.TagsModel,
          },
        ],
      });
      if (news.length < 1) return null;
      return news.map(newsMapper.toEntity);;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const news = await this.NewsModel.findOne({
        where: { id },
        include: [
          {
            attributes: ['id', 'name'],
            model: this.TopicsModel,
          },
          {
            attributes: ['id', 'name'],
            model: this.TagsModel,
          },
        ],
      });
      if (!news) return null;
      return newsMapper.toEntity(news);
    } catch (error) {
      throw error;
    }
  }

  async getByStatus(status) {
    try {
      const news = await this.NewsModel.findAll({
        where: { status: this.NewsStatus[status] },
        include: [
          {
            attributes: ['id', 'name'],
            model: this.TopicsModel,
          },
          {
            attributes: ['id', 'name'],
            model: this.TagsModel,
          },
        ],
      });
      if (news.length < 1) return null;
      return news.map(newsMapper.toEntity);
    } catch (error) {
      throw error;
    }
  }

  async getByTopics(topicsName) {
    try {
      const news = await this.NewsModel.findAll({
        include: [
          {
            attributes: ['id', 'name'],
            model: this.TopicsModel,
            where: { name: topicsName },
          },
          {
            attributes: ['id', 'name'],
            model: this.TagsModel,
          },
        ],
      });
      if (news.length < 1) return null;
      return news.map(newsMapper.toEntity);
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const create = await this.NewsModel.create(newsMapper.toDatabase(data));
      await sqlTrx.commit();
      return newsMapper.toEntity(create);
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }

  async update(id, data) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const update = await this.NewsModel.update(
        data,
      { where: { id } });
      await sqlTrx.commit();
      return update;
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }

  async delete(id) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const update = await this.NewsModel.update(
        { status: this.NewsStatus.DELETED },
        { where: { id } });
      await sqlTrx.commit();
      return update;
    } catch (error) {
      // await sqlTrx.rollback();
      throw error;
    }
  }

  async mapNewsTags(newsId, tagsId) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const newsTags = await this.NewsTagsModel.create({
        news_id: newsId,
        tags_id: tagsId,
      });
      await sqlTrx.commit();
      return newsTags;
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }
}

module.exports = SequelizeNewsRepository;
