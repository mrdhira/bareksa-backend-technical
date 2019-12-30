const { attributes } = require('structure');
const NewsStatus = require('./NewsStatus');

const News = attributes({
  id: {
    type: String,
    guid: {
      version: ['uuidv4']
    },
    required: true,
  },
  title: String,
  text: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
})(class News {
  isDraft() {
    return this.status === NewsStatus.DRAFT.value;
  }

  isDeleted() {
    return this.status === NewsStatus.DELETED.value;
  }

  isPublished() {
    return this.status === NewsStatus.PUBLISHED.value;
  }
});

module.exports = News;
