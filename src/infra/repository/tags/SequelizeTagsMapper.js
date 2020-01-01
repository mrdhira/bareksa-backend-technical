const TagsDomain = require('src/domain/tags/Tags');

const SequelizeTagsMapper = {
  toEntity(data) {
    return new TagsDomain({
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

module.exports = SequelizeTagsMapper;
