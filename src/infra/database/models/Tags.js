'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('tags', {
    id: {
      primaryKey: true,
      type : DataTypes.STRING,
    },
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  Tags.associate = function(models) {
    Tags.belongsToMany(models.News, {
      through: 'news_tags',
      foreignKey: 'tags_id',
    });
  };
  return Tags;
};
