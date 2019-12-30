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
    News.belongsTo(models.Topics, {
      through: 'TopicsNews',
      foreignKey: 'news_id',
    });
    News.belongsToMany(models.Tags, {
      through: 'NewsTags',
      foreignKey: 'news_id',
    });
  };
  return News;
};
