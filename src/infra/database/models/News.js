'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('news', {
    id: {
      primaryKey: true,
      type : DataTypes.STRING,
    },
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  News.associate = function(models) {
    News.belongsToMany(models.Topics, {
      through: 'topics_news',
      foreignKey: 'news_id',
    });
    News.belongsToMany(models.Tags, {
      through: 'news_tags',
      foreignKey: 'news_id',
    });
  };
  return News;
};
