const NewsDomain = require('src/domain/news/News');
const NewsStatus = require('src/domain/news/NewsStatus');

const SequelizeNewsMapper = {
  toEntity(data) {
    return new NewsDomain({
      id: data.id,
      title: data.title,
      text: data.text,
      status: NewsStatus[data.status],
      topicsId: data.Topics ? data.Topics[0].id : null,
      topicsName: data.Topics ? data.Topics[0].name : null,
      tags: (data.Tags && data.Tags.length > 0) ? data.Tags : null,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  },

  toDatabase(data) {
    return {
      id: data.id,
      title: data.title,
      text: data.text,
      status: data.status,
    };
  },
};

module.exports = SequelizeNewsMapper;
