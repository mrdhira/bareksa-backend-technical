const tagsMapper = require('./SequelizeTagsMapper');

class SequelizeTagsReposiotry {
  constructor({ sequelize, TagsModel, NewsTagsModel }) {
    this.sequelize = sequelize;
    this.TagsModel = TagsModel;
    this.NewsTagsModel = NewsTagsModel;
  }

  async getAll() {
    try {
      const tags = await this.TagsModel.findAll();
      if (tags.length < 1) return null;
      return tags.map(tagsMapper.toEntity);;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const tags = await this.TagsModel.findOne({ where: { id } });
      if (!tags) return null;
      return tagsMapper.toEntity(tags);
    } catch (error) {
      throw error;
    }
  }

  async findOrCreateByName(tags) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const [tag, created] = await this.TagsModel.findOrCreate({
        where: { name: tags.name },
        defaults: { id: tags.id },
      });
      await sqlTrx.commit();
      return tagsMapper.toEntity(tag);
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }

  async update(id, tagsName) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const update = await this.TagsModel.update(
        { name: tagsName },
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
      const destroy = await this.TagsModel.destroy({ where: { id } });
      await sqlTrx.commit();
      return destroy;
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }

  async deleteMapNewsTags(tagsId) {
    const sqlTrx = await this.sequelize.transaction();
    try {
      const destroy = await this.NewsTagsModel.destroy({ where: { tags_id: tagsId } });
      await sqlTrx.commit();
      return destroy;
    } catch (error) {
      await sqlTrx.rollback();
      throw error;
    }
  }
}

module.exports = SequelizeTagsReposiotry;
