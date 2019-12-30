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
      through: 'NewsTags',
      foreignKey: 'tags_id',
    });
  };
  return Tags;
};
