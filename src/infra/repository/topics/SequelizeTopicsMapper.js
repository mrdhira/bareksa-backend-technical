const TopicsDomain = require('src/domain/topics/Topics');

const SequelizeTopicsMapper = {
  toEntity(data) {
    return new TopicsDomain({
      id: data.id,
      name: data.name,
      // createdAt: data.created_at,
      // updatedAt: data.updated_at,
    });
  },

  toDatabase(data) {
    return {
      id: data.id,
      name: data.name,
    };
  },
};

module.exports = SequelizeTopicsMapper;
