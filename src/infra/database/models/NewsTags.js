'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewsTags = sequelize.define('news_tags', {
    id: {
      primaryKey: true,
      type : DataTypes.INTEGER,
    },
    news_id: DataTypes.STRING,
    tags_id: DataTypes.STRING
  }, {
    underscored: true,
  });
  NewsTags.associate = function(models) {
    NewsTags.belongsTo(models.News, {
      sourceKey: 'id',
      foreignKey: 'news_id',
    });
    NewsTags.belongsTo(models.Tags, {
      sourceKey: 'id',
      foreignKey: 'tags_id',
    });
  };
  return NewsTags;
};
