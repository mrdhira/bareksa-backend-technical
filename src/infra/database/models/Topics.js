'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('topics', {
    id: {
      primaryKey: true,
      type : DataTypes.STRING
    },
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  Topics.associate = function(models) {
    Topics.belongsToMany(models.News, {
      through: 'TopicsNews',
      foreignKey: 'topics_id',
    });
  };
  return Topics;
};
