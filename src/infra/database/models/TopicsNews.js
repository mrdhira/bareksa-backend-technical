'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicsNews = sequelize.define('topics_news', {
    id: {
      primaryKey: true,
      type : DataTypes.INTEGER,
    },
    topics_id: DataTypes.STRING,
    news_id: DataTypes.STRING
  }, {
    underscored: true,
  });
  TopicsNews.associate = function(models) {
    TopicsNews.belongsTo(models.Topics, {
      sourceKey: 'id',
      foreignKey: 'topics_id',
    });
    TopicsNews.belongsTo(models.News, {
      sourceKey: 'id',
      foreignKey: 'news_id',
    });
  };
  return TopicsNews;
};
