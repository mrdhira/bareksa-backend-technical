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
  title: {
    type: String,
    required: false,
    empty: true,
  },
  text: {
    type: String,
    required: false,
    empty: true,
  },
  status: {
    type: String,
    required: false,
    empty: true,
  },
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
